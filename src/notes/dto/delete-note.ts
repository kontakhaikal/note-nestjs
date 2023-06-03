import { IsNotEmpty } from 'class-validator';
import { UserCredential } from './user-credential';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Localize } from '../../i18n/types';

export class DeleteNoteRequest implements Localize {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  readonly id: string;
  constructor(
    id: string,
    public readonly userCredential: UserCredential,
    public readonly i18n?: { readonly lang: string },
  ) {
    this.id = id;
  }
}

export class DeleteNoteResponse {}
