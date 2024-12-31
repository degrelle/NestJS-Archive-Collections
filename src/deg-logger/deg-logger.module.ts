import { Module } from '@nestjs/common';
import { DegLoggerService } from './deg-logger.service';

@Module({
  providers: [DegLoggerService],
  exports: [DegLoggerService]
})
export class DegLoggerModule {}
