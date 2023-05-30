import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationError } from '../error/authentication-error';
import { ResourceNotFoundError } from '../error/resource-notfound-error';

@Catch(AuthenticationError)
export class AuthenticationErrorFilter implements ExceptionFilter {
  catch(exception: AuthenticationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.UNAUTHORIZED;

    response.status(status).json({
      code: status,
      status: status.toString(),
      path: request.originalUrl,
      error: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}

@Catch(ResourceNotFoundError)
export class ResourceNotFoundErrorFilter implements ExceptionFilter {
  catch(exception: ResourceNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.NOT_FOUND;

    response.status(status).json({
      code: status,
      status: status.toString(),
      path: request.originalUrl,
      timestamp: new Date().toISOString(),
      error: exception.message,
    });
  }
}
