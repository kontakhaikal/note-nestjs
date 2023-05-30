import { IsUUID, ValidateNested } from 'class-validator';
import { UserCredential } from './user-credential';

export class DeleteNoteRequest {
  @IsUUID()
  readonly id: string;
  @ValidateNested()
  readonly userCredential: UserCredential;
  constructor(id: string, userCredential: UserCredential) {
    this.id;
    this.userCredential = userCredential;
  }
}

export class DeleteNoteResponse {}
