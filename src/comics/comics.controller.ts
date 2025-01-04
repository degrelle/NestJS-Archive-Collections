import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { DegLoggerService } from '../deg-logger/deg-logger.service';
import { CreateComicDto, CustomBoolean } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';

@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}
  private readonly logger = new DegLoggerService(ComicsController.name)

  @Get()
  findAll() {
    this.logger.log(`Request for ALL Comics`, ComicsController.name)
    return this.comicsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.comicsService.findOne(id)
  }

  @Get('/mancolista/:mancolista')
  findAllMancolista(@Param('mancolista') mancolista: CustomBoolean) {
    return this.comicsService.findAllMancolista(mancolista)
  }

  @Post()
  createComic(@Body(ValidationPipe) createComicDto: CreateComicDto) {
    return this.comicsService.create(createComicDto)
  }

  @Patch(':id')
  updateComic(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateComicDto: UpdateComicDto) {
    return this.comicsService.update(id, updateComicDto)
  }

  @Delete(':id')
  deleteComic(@Param('id', ParseIntPipe) id: number) {
    return this.comicsService.delete(id)
  }

}
