import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: [process.env.CORS_ORIGIN, 'http://localhost:5173'],
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
