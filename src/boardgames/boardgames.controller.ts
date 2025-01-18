import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { BoardgamesService } from './boardgames.service';
import { CreateBoardgameDto } from './dto/create-boardgame.dto';
import { UpdateBoardgameDto } from './dto/update-boardgame.dto';

@Controller('boardgames')
export class BoardgamesController {
  constructor(private readonly boardgamesService: BoardgamesService) {}

  @Post()
  createBoardgame(@Body(ValidationPipe) createBoardgameDto: CreateBoardgameDto) {
    return this.boardgamesService.create(createBoardgameDto);
  }

  @Get()
  findAll() {
    return this.boardgamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardgamesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateBoardgameDto: UpdateBoardgameDto) {
    return this.boardgamesService.update(id, updateBoardgameDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardgamesService.remove(id);
  }
}
