import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {MongoExceptionFilter, ValidationExceptionFilter} from "./exeptionsFilters/exeption-filter";

async function bootstrap() {
  const PORT = process.env.PORT || 3001;

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationExceptionFilter(), new MongoExceptionFilter())
  app.setGlobalPrefix('api');
  await app.listen(PORT, () => {
    console.log('Server has started on port ' + PORT);
  });
}
bootstrap();
