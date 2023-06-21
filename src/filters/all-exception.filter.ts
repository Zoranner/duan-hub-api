import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const now = Date.now();
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpException = exception instanceof HttpException;
    const httpStatus = httpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const requestUrl = httpAdapter.getRequestUrl(ctx.getRequest());

    const responseBody = {
      code: -1,
      message: exception.message,
    };

    this.logger.error(`[${requestUrl}] ${exception.stack} +${Date.now() - now}ms`);
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    //throw exception;
  }
}
