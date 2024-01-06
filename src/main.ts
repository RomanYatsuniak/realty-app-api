/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'aws-sdk';
import { createSecretKey } from 'crypto';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  config.update({
    accessKeyId: configService.get('KEY_ID'),
    secretAccessKey: configService.get('ACCESS_KEY'),
    region: configService.get('REGION'),
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
