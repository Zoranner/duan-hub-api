import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { SuccessInterceptor } from './interceptors/success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.enableCors({ origin: true });
  await app.listen(3000);
}
bootstrap();
