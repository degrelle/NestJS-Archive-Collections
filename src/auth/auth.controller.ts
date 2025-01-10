import {
  Body,
  Controller, HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {
  }

  @Post('register') // auth/register
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    const { password_hash } = createUserDto;
    // Create Password Hash
    const hashedPassword = await this.authService.hashPassword(password_hash);
    const hashedUser = {...createUserDto, password_hash: hashedPassword};
    // Save New User on database
    return await this.usersService.create(hashedUser)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login') // auth/login
  async login(@Body(ValidationPipe) loginUserDto: LoginUserDto, @Res() response: Response): Promise<User> {
    const { username, password } = loginUserDto;
    // Find User from database
    const findUser = await this.usersService.findOneByUsername(username);
    // Handle find error
    if (!findUser) {
      response.status(HttpStatus.UNAUTHORIZED).send({ "message": "Data not valid!" });
      return
    }
    // Check and compare the password with hash
    const isPasswordValid = await this.authService.verifyPassword(password, findUser.password_hash);
    if(!isPasswordValid) {
      response.status(HttpStatus.UNAUTHORIZED).send({ "message": "Data not valid!" })
      return
    }
    response.status(HttpStatus.OK).send(findUser)
  }
}
