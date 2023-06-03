import { IsNotEmpty, Length, Max } from 'class-validator';
import { Localize } from '../../i18n/types';
import { UserCredential } from './user-credential';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Trim } from '../../validation/transformer';

export class UpdateNoteRequest implements Localize {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  readonly id: string;

  @Trim()
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Length(1, 60, { message: i18nValidationMessage('validation.LENGTH') })
  readonly title: string;

  @Trim()
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Length(1, 10_000, { message: i18nValidationMessage('validation.LENGTH') })
  readonly body: string;

  constructor(
    id: string,
    title: string,
    body: string,
    public readonly userCredential: UserCredential,
    public readonly i18n?: { lang: string },
  ) {
    this.id = id;
    this.title = title;
    this.body = body;
  }
}
