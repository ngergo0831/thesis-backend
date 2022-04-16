import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { logger } from './logger';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ExceptionHandlerFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { body } = ctx.getRequest<Request>();
    const status = exception.getStatus();

    logger.error(exception);
    logger.error({ body });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      error: exception.getResponse()
    });
  }
}
