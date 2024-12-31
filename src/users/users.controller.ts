import {
  Body,
  Controller,
  Delete,
  Get,
  Ip, Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { DegLoggerService } from '../deg-logger/deg-logger.service';

@SkipThrottle()
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new DegLoggerService(UsersController.name)

  @SkipThrottle({ default: false })
  @Get() // GET /users
  findAll(@Ip() ip: string, @Query('role') role?: UserRole) {
    this.logger.log(`Request for ALL Users\t${ip}`, UsersController.name)
    return this.usersService.findAll(role)
  }

  @Throttle({ short: { ttl: 1000, limit: 1 }})
  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id)
  }

  @Post() // POST /users
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id') // Delete /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id)
  }
}
