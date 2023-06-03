import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationError } from '../error/authentication-error';
import { ResourceNotFoundError } from '../error/resource-notfound-error';
import { ValidationError } from '../error/validation-error';

@Catch(AuthenticationError)
export class AuthenticationErrorFilter implements ExceptionFilter {
  catch(exception: AuthenticationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.UNAUTHORIZED;

    response.status(status).json({
      code: status,
      status: 'UNAUTHORIZED',
      path: request.originalUrl,
      timestamp: new Date(),
      error: exception.message,
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
      status: 'NOT_FOUND',
      path: request.originalUrl,
      timestamp: new Date(),
      error: exception.message,
    });
  }
}

@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {
  catch(exception: ValidationError<any>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      code: status,
      status: 'BAD_REQUEST',
      path: request.originalUrl,
      timestamp: new Date(),
      error: exception.detail,
    });
  }
}
