export class UserLoginRequest {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
}

export class UserLoginResponse {
  constructor(public readonly credentialToken: string) {}
}
