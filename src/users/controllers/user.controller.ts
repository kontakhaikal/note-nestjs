import { Controller, HttpStatus, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserLoginRequest } from '../dto/user-login';
import { UserService } from '../services/user.service';
import { Service } from '../types';

@Controller()
export class UserController {
  constructor(
    @Inject(Service.USER_SERVICE) private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Req()
    req: Request<
      {},
      {},
      {
        username: string;
        firstName: string;
        lastName: string;
        password: string;
      }
    >,
    @Res() res: Response,
  ) {
    const lang = req.headers['accept-language'];
    const result = await this.userService.register({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      i18n: { lang },
    });

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
    const result = await this.userService.login(req.body);

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      status: HttpStatus.OK.toString(),
      path: req.originalUrl,
      timestamp: new Date(),
      data: result,
    });
  }
}
