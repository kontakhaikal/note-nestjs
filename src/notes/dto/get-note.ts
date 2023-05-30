import { ValidateNested } from 'class-validator';
import { UserCredential } from './user-credential';
import { Note } from '../entities/note.entity';

export class GetNotesRequest {
  @ValidateNested()
  public readonly userCredential: UserCredential;
  constructor(userCredential: UserCredential) {
    this.userCredential = userCredential;
  }
}

export class GetNotesResponse {
  readonly notes: Note[];
  constructor(notes: Note[]) {
    this.notes = notes;
  }
}
