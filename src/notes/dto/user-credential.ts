import { IsNotEmpty } from 'class-validator';

export class UserCredential {
  @IsNotEmpty()
  readonly id: string;
  constructor(id: string) {
    this.id = id;
  }
}
