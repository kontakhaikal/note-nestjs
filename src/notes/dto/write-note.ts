import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { UserCredential } from './user-credential';

export class WriteNoteRequest {
  public readonly title: string;
  public readonly body: string;

  @ValidateNested()
  public readonly userCredential: UserCredential;

  constructor(title: string, body: string, userCredential: UserCredential) {
    this.title = title;
    this.body = body;
    this.userCredential = userCredential;
  }
}

export class WritNoteResponse {
  constructor(public readonly id: string) {}
}
