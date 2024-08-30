import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Config } from './common/config';
import { AllExceptionsFilter } from './common/interceptors/errors.interceptor';
import { classValidatorPipeInstance } from './common/interceptors/validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(classValidatorPipeInstance());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  await app.listen(Config.PORT || 4500, '0.0.0.0');
  const environment = process.env.NODE_ENV || 'development';
  console.log(`Starting application in ${environment} mode`, 'Bootstrap');
  //print the url
  console.log(`Application is running on: ${await app.getUrl()}/`);
}
bootstrap().then(() => console.log('Application is running'));
