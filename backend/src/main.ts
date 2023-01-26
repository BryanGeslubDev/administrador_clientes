import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SYSTEM } from './config';

const { PORT } = SYSTEM;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
