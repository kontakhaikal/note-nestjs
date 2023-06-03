import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { DatabaseModule } from './database/database.module';
import { NoteModule } from './notes/note.module';
import { UserModule } from './users/user.module';

import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { ValidationModule } from './validation/validation.module';
import { AuthenticationErrorFilter } from './filter/exception';
import { join } from 'path';

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      logging: false,
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
      typesOutputPath: join(__dirname, '../src/generated/i18n.generated.ts'),
    }),
    DatabaseModule,
    NoteModule,
    UserModule,
    ValidationModule,
  ],
  providers: [AuthenticationErrorFilter],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('notes');
  }
}
