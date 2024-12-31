import { Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { DegLoggerService } from './deg-logger/deg-logger.service';
import { TypeORMError } from 'typeorm';
import { Request, Response } from 'express';

type MyResponseObj = {
  statusCode: number,
  timestamp: string,
  path: string,
  response: string | object
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new DegLoggerService(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const myResponseObj: MyResponseObj = {
      statusCode: 200,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: ''
    }

    if(exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus()
      myResponseObj.response = exception.getResponse()
    } else if(exception instanceof TypeORMError) {
      myResponseObj.statusCode = 422
      myResponseObj.response = exception.message.replaceAll(/\n/g, ' ')
    } else {
      myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
      myResponseObj.response = 'Internal Server Error'
    }

    response.status(200).json(myResponseObj);
    this.logger.error(myResponseObj.response, AllExceptionsFilter.name)

    super.catch(exception, host)
  }
}
