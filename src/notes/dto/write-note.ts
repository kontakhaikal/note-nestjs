import { IsNotEmpty, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Localize } from '../../i18n/types';
import { UserCredential } from './user-credential';
import { Trim } from '../../validation/transformer';

export class WriteNoteRequest implements Localize {
  @Trim()
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Length(1, 60, { message: i18nValidationMessage('validation.LENGTH') })
  public readonly title: string;

  @Trim()
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Length(1, 10_000, { message: i18nValidationMessage('validation.LENGTH') })
  public readonly body: string;

  constructor(
    title: string,
    body: string,
    public readonly userCredential: UserCredential,
    public readonly i18n?: { lang: string },
  ) {
    this.title = title?.trim();
    this.body = body?.trim();
  }
}

export class WritNoteResponse {
  constructor(public readonly id: string) {}
}
