import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthenticationError } from '../error/authentication-error';
import { Service } from '../users/types';
import { CredentialService } from '../users/services/credential.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    @Inject(Service.CREDENTIAL_SERVICE)
    private readonly credentialService: CredentialService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];

    if (authorization === undefined) {
      throw new AuthenticationError('Authorization headers is required');
    }

    const [bearer, token] = authorization.split(' ');

    if (!bearer.startsWith('Bearer')) {
      throw new AuthenticationError(
        'Authorization headers should start with "Bearer"',
      );
    }

    const userCredential = await this.credentialService
      .retriveUserCredential(token)
      .catch(() => {
        throw new AuthenticationError('Authorization headers invalid');
      });

    req.userCredential = userCredential;

    next();
  }
}
