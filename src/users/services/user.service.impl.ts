import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { AuthenticationError } from '../../error/authentication-error';
import { UseI18nValidator, UseValidator } from '../../validation/decorator';
import { Service } from '../types';
import { UserCredential } from '../dto/user-credential';
import { UserLoginRequest, UserLoginResponse } from '../dto/user-login';
import {
  UserRegisterRequest,
  UserRegisterResponse,
} from '../dto/user-register';
import { User } from '../entities/user.entity';
import { CredentialService } from './credential.service';
import { PasswordService } from './password.service';
import { UserService } from './user.service';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(Service.CREDENTIAL_SERVICE)
    private readonly credentialService: CredentialService,
    @Inject(Service.PASSWORD_SERVICE)
    private readonly passwordService: PasswordService,
  ) {}

  @UseValidator(UserLoginRequest)
  async login(request: UserLoginRequest): Promise<UserLoginResponse> {
    const user = await this.userRepository.findOneBy({
      username: request.username,
    });

    if (user === null) {
      throw new AuthenticationError();
    }

    const isPasswordMatched = await this.passwordService.compare(
      request.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new AuthenticationError();
    }

    const credentialToken =
      await this.credentialService.generateCredentialToken(
        new UserCredential(user.id),
      );

    return new UserLoginResponse(credentialToken);
  }

  @UseI18nValidator(UserRegisterRequest)
  async register(request: UserRegisterRequest): Promise<UserRegisterResponse> {
    const hashedPassword = await this.passwordService.hash(request.password);

    const user = new User(
      randomUUID(),
      request.firstName,
      request.lastName,
      request.username,
      hashedPassword,
    );

    await this.userRepository.save(user);

    return new UserRegisterResponse(user.id);
  }
}
