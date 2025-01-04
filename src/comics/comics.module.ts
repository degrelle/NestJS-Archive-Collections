import { Module } from '@nestjs/common';
import { ComicsController } from './comics.controller';
import { ComicsService } from './comics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comics } from './comics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comics])],
  controllers: [ComicsController],
  providers: [ComicsService]
})
export class ComicsModule {}
