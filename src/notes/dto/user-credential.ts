import { IsNotEmpty } from 'class-validator';

export class UserCredential {
  constructor(public readonly id: string) {}
}
