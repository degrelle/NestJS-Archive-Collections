import { Body, Controller, HttpException, HttpStatus, NotFoundException, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {
  }

  @Post('register') // auth/register
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    const { username, password_hash } = createUserDto;
    // Create Password Hash
    const hashedPassword = await this.authService.hashPassword(password_hash);
    const hashedUser = {...createUserDto, password_hash: hashedPassword};
    // Save New User on database
    return await this.usersService.create(hashedUser)
  }

  @Post('login') // auth/login
  async login(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<any> {
    const { username, password_hash } = loginUserDto;
    // Find User from database
    const findUser = await this.usersService.findOneByUsername(username);
    // Handle find error
    if (!findUser) {
      throw new NotFoundException('User not found!!!');
    }
    // Check and compare the password with hash
    const isPasswordValid = await this.authService.verifyPassword(password_hash, findUser.password_hash);
    if(!isPasswordValid) {
      throw new HttpException('Password not valid', HttpStatus.UNAUTHORIZED);
    }
    return { message: 'Logged in' }
  }
}
