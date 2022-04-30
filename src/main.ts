import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { logger } from './config/logger';
import * as rTracer from 'cls-rtracer';
import { ExceptionHandlerFilter } from './config/exception-handler.filter';
import * as cookieParser from 'cookie-parser';

const morgan = require('morgan');

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    logger
  });

  app.useGlobalPipes(new ValidationPipe());

  const stream = {
    write: function (message, encoding) {
      logger.log(message);
    }
  };

  app.use(rTracer.expressMiddleware());

  app.use(
    morgan(
      function (tokens, req, res) {
        return JSON.stringify({
          morgan: true,
          'remote-addr': tokens['remote-addr'](req, res),
          referrer: tokens.referrer(req, res),
          'user-agent': tokens['user-agent'](req, res),
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          status: tokens.status(req, res),
          length: tokens.res(req, res, 'content-length'),
          'response-time': tokens['response-time'](req, res),
          userId: req.user?.id
        });
      },
      {
        stream
      }
    )
  );

  app.useGlobalFilters(new ExceptionHandlerFilter());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Thesis Backend')
    .setDescription('Thesis Backend API')
    .setVersion('1.0')
    .addTag('thesis')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: true });

  await app.listen(3000);
}

bootstrap();
