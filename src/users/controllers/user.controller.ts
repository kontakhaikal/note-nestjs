import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserLoginRequest } from '../dto/user-login';
import { UserRegisterRequest } from '../dto/user-register';
import { UserService } from '../services/user.service';
import { Service } from '../types';

@Controller('users')
export class UserController {
  constructor(
    @Inject(Service.USER_SERVICE) private readonly userServie: UserService,
  ) {}

  @Post('register')
  async register(
    @Req() req: Request<{}, {}, UserRegisterRequest>,
    @Res() res: Response,
  ) {
    const result = await this.userServie.register(req.body);

    return res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      status: HttpStatus.CREATED.toString(),
      path: req.originalUrl,
      timestamp: new Date(),
      data: result,
    });
  }

  @Post('login')
  async login(
    @Req() req: Request<{}, {}, UserLoginRequest>,
    @Res() res: Response,
  ) {
    const result = await this.userServie.login(req.body);

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      status: HttpStatus.OK.toString(),
      path: req.originalUrl,
      timestamp: new Date(),
      data: result,
    });
  }
}
