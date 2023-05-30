import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import {
  AuthenticationErrorFilter,
  ResourceNotFoundErrorFilter,
} from './filter/exception';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AuthenticationErrorFilter());
  app.useGlobalFilters(new ResourceNotFoundErrorFilter());

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  await app.listen(3000);
})();
