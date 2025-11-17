import { NestFactory } from '@nestjs/core';
import { GlobalExceptionFilter } from '@pinpoint/filters/global-exception.filter';
import { AppModule } from './app.module';
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

  const port = process.env.PORT || 8080;
  await app.listen(port, '0.0.0.0').then(() => {
    console.log(`Server is running on port ${port}`);
  });
}
void bootstrap();

// const app = await NestFactory.create(AppModule, { bufferLogs: true });
// const logger = app.get(Logger);
// app.useLogger(logger);
// app.useGlobalFilters(new GlobalExceptionFilter());
