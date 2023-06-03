import { UserCredential } from './user-credential';
import { Note } from '../entities/note.entity';
import { Localize } from '../../i18n/types';

export class GetNotesRequest implements Localize {
  constructor(
    public readonly userCredential: UserCredential,
    public readonly i18n?: { lang: string },
  ) {}
}

export class GetNotesResponse {
  readonly notes: Note[];
  constructor(notes: Note[]) {
    this.notes = notes;
  }
}
