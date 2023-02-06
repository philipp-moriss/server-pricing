import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {MongoExceptionFilter, ValidationExceptionFilter} from "./common/helpers/exceptions/exeption-filter";

async function bootstrap() {
  const PORT = process.env.PORT || 3001;

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('ponyWeb backend 0.6')
    .setDescription('Root api url: /api')
    .setVersion('0.6')
    .addTag('ponyWeb')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)


  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationExceptionFilter(), new MongoExceptionFilter())
  app.setGlobalPrefix('api');

  await app.listen(PORT, () => {
    console.log('Server has started on port ' + PORT);
  });
}
bootstrap();
