import { IsNotEmpty, ValidateNested } from 'class-validator';
import { UserCredential } from './user-credential';

export class UpdateNoteRequest {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly body: string;

  @ValidateNested()
  readonly userCredential: UserCredential;
  constructor(
    id: string,
    title: string,
    body: string,
    userCredential: UserCredential,
  ) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.userCredential = userCredential;
  }
}
