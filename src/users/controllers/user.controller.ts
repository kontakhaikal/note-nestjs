import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Service } from '../types';
import { UserService } from '../services/user.service';
import { UserSignInRequest } from '../dto/user-signin.dto';
import { plainToInstance } from 'class-transformer';
import { UserLoginRequest } from '../dto/user-login.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(Service.USER_SERVICE) private readonly userServie: UserService,
  ) {}

  @Post('signin')
  async signIn(@Body() body: UserSignInRequest) {
    return await this.userServie.signIn(body);
  }

  @Post('login')
  async LogIn(@Body() body: UserLoginRequest) {
    return await this.userServie.logIn(body);
  }
}
