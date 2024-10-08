import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

import { IErrorMessage } from '../interfaces/error.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = exception.getStatus();
    const errorMessage = exception.message;

    response.status(statusCode).json({
      message: errorMessage,
      statusCode,
      timestamp: new Date().toISOString(),
    });
  }
}

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  public catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = exception.getStatus();
    const errorResponse = exception.getResponse() as any;

    response.status(statusCode).json({
      message: 'Validation failed',
      errors: errorResponse.message,
      statusCode,
      timestamp: new Date().toISOString(),
    });
  }
}

export class CustomHttpException extends HttpException {
  constructor(
    error: any,
    commonMessageError: IErrorMessage,
    defaultStatus?: number,
  ) {
    const message =
      error.message && error.message.EN ? error.message : commonMessageError;
    const status =
      error.status || defaultStatus || HttpStatus.INTERNAL_SERVER_ERROR;

    super(Object.assign(error, message), status);
  }
}
