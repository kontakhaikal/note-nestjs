import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { NoteModule } from './notes/note.module';
import { UserModule } from './users/user.module';

import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { ValidationModule } from './validation/validation.module';
import { AuthenticationErrorFilter } from './filter/exception';

@Global()
@Module({
  imports: [DatabaseModule, NoteModule, UserModule, ValidationModule],
  providers: [AuthenticationErrorFilter],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('notes');
  }
}
