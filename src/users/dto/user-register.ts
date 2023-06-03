import { IsNotEmpty, Length, Matches, Validate } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Localize } from '../../i18n/types';
import { UsernameUniqueConstraint } from '../../validation/constraint';
import { Trim } from '../../validation/transformer';

export class UserRegisterRequest implements Localize {
  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  @Matches(/^(?!.*\.{2})[A-Za-z0-9.]+$/, {
    message: i18nValidationMessage('validation.USERNAME'),
  })
  @Validate(UsernameUniqueConstraint, {
    message: i18nValidationMessage('validation.USERNAME_UNIQUE'),
  })
  public readonly username: string;

  @Trim()
  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  @Length(1, 100, { message: i18nValidationMessage('validation.LENGTH') })
  public readonly firstName: string;

  @Trim()
  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  @Length(1, 100, { message: i18nValidationMessage('validation.LENGTH') })
  public readonly lastName: string;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  @Matches(/^.{8,}$/, {
    message: i18nValidationMessage('validation.PASSWORD.LENGTH'),
  })
  @Matches(/^(?=.*[a-z])/, {
    message: i18nValidationMessage('validation.PASSWORD.LOWERCASE'),
  })
  @Matches(/^(?=.*[A-Z])/, {
    message: i18nValidationMessage('validation.PASSWORD.UPPERCASE'),
  })
  @Matches(/^(?=.*\d)/, {
    message: i18nValidationMessage('validation.PASSWORD.DIGIT'),
  })
  @Matches(/^(?=.*[!@#$%^&*])/, {
    message: i18nValidationMessage('validation.PASSWORD.SPECIAL'),
  })
  public readonly password: string;

  constructor(
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    public readonly i18n?: { lang: string },
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}

export class UserRegisterResponse {
  constructor(public readonly id: string) {}
}
