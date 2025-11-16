import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from '@pinpoint/filters/global-exception.filter';
// import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  // const logger = app.get(Logger);
  // app.useLogger(logger);
  // Enable CORS
  app.enableCors();

  // Optional: Set global prefix
  app.setGlobalPrefix('api/v1');

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

// const app = await NestFactory.create(AppModule, { bufferLogs: true });
// const logger = app.get(Logger);
// app.useLogger(logger);
// app.useGlobalFilters(new GlobalExceptionFilter());
