import { ClassConstructor, plainToInstance } from 'class-transformer';
import {
  validate as validateAsync,
  ValidationError as ClassValidationError,
} from 'class-validator';
import { ValidationError } from '../error/validation-error';

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
            messages.length === 1 ? messages : messages[0];
        });

        throw new ValidationError(JSON.stringify(errorMessage));
      }

      return await originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
