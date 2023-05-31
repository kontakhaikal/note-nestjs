import { IsNotEmpty, Validate } from 'class-validator';
import { UsernameUniqueConstraint } from '../../validation/contraint';

export class UserRegisterRequest {
  @IsNotEmpty()
  @Validate(UsernameUniqueConstraint)
  public readonly username: string;

  @IsNotEmpty()
  public readonly firstName: string;

  @IsNotEmpty()
  public readonly lastName: string;

  @IsNotEmpty()
  public readonly password: string;

  constructor(
    username: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}

export class UserRegisterResponse {
  constructor(public readonly id: string) {}
}
