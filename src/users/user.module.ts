import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './types';
import { User } from './entities/user.entity';
import { CredentialServiceImpl } from './services/credential.service.impl';
import { PasswordServiceImpl } from './services/password.service.impl';
import { UserServiceImpl } from './services/user.service.impl';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [
    { provide: Service.USER_SERVICE, useClass: UserServiceImpl },
    { provide: Service.PASSWORD_SERVICE, useClass: PasswordServiceImpl },
    { provide: Service.CREDENTIAL_SERVICE, useClass: CredentialServiceImpl },
  ],
  exports: [Service.CREDENTIAL_SERVICE],
})
export class UserModule {}
