import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthenticationError } from '../error/authentication-error';
import { Service } from '../users/types';
import { CredentialService } from '../users/services/credential.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '../generated/i18n.generated';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    @Inject(Service.CREDENTIAL_SERVICE)
    private readonly credentialService: CredentialService,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    const lang = req.headers['accept-language'];

    if (authorization === undefined) {
      throw new AuthenticationError(
        this.i18nService.t('authentication.NOT_EXIST', { lang }),
      );
    }

    const [bearer, token] = authorization.split(' ');

    if (!bearer.startsWith('Bearer')) {
      throw new AuthenticationError(
        this.i18nService.t('authentication.NOT_BEARER', { lang }),
      );
    }

    const userCredential = await this.credentialService
      .retrieveUserCredential(token)
      .catch(() => {
        throw new AuthenticationError(
          this.i18nService.t('authentication.INVALID', { lang }),
        );
      });

    req.userCredential = userCredential;

    next();
  }
}
