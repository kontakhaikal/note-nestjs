import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { UserCredential } from '../dto/user-credential.dto';
import { CredentialService } from './credential.service';

@Injectable()
export class CredentialServiceImpl implements CredentialService {
  constructor(private readonly jwtService: JwtService) {}

  async retriveUserCredential(
    credentialToken: string,
  ): Promise<UserCredential> {
    const userCredential =
      this.jwtService.verify<UserCredential>(credentialToken);
    return userCredential;
  }

  async generateCredentialToken(
    userCredential: UserCredential,
  ): Promise<string> {
    return this.jwtService.sign(instanceToPlain(userCredential));
  }
}
