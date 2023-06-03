import { ClassConstructor, plainToInstance } from 'class-transformer';
import {
  validate as validateAsync,
  ValidationError as ClassValidationError,
} from 'class-validator';
import { ValidationError } from '../error/validation-error';
import { Inject } from '@nestjs/common';
import { I18nService, I18nValidationError } from 'nestjs-i18n';
import { Localize } from '../i18n/types';

/**
 *
 * @param types Class type for each parameter(s) on decorated method
 */
export function UseValidator(...types: ClassConstructor<any>[]) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const errors: ClassValidationError[] = [];

      if (types.length !== args.length) {
        throw new Error('Number of types and args are not equal');
      }

      for (const [index, arg] of args.entries()) {
        const transformedArgs = plainToInstance(types[index], arg);
        const result = await validateAsync(transformedArgs);
        errors.push(...result);
      }

      if (errors.length > 0) {
        const errorMessage: Object = {};

        errors.forEach((error) => {
          const messages = Object.values(error.constraints);
          errorMessage[error.property] =
            messages.length > 1 ? messages : messages[0];
        });

        throw new ValidationError(JSON.stringify(errorMessage));
      }

      return await originalMethod.apply(this, args);
    };
  };
}

export function UseI18nValidator(...types: ClassConstructor<any>[]) {
  const injectI18nService = Inject(I18nService);
  return function (
    target: any,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const originalMethod = descriptor.value;
    injectI18nService(target, 'i18nService');

    descriptor.value = async function (...args: Localize[]) {
      const errors: I18nValidationError[] = [];
      const i18nService = this.i18nService as I18nService;

      if (types.length !== args.length) {
        throw new Error('Number of types and args are not equal');
      }

      for (const [index, arg] of args.entries()) {
        const transformedArgs: Localize = plainToInstance(types[index], arg);
        const lang = transformedArgs.i18n?.lang?.toString();
        const result = await i18nService.validate(transformedArgs, { lang });
        errors.push(...result);
      }

      if (errors.length > 0) {
        const errorMessage: Object = {};

        errors.forEach((error) => {
          const messages = Object.values(error.constraints);
          errorMessage[error.property] =
            messages.length > 1 ? messages : messages[0];
        });

        throw new ValidationError(errorMessage);
      }

      return await originalMethod.apply(this, args);
    };
  };
}
