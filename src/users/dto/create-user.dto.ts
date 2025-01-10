import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password_hash: string;

  @IsEnum(['ADMIN', 'SUPERVISOR', 'EDITOR', 'SIMPLE_USER'], {
    message: 'Valid role required'
  })
  @IsNotEmpty()
  role: UserRole;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  telephone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  email: string;
}

export type UserRole = 'ADMIN' | 'SUPERVISOR' | 'EDITOR' | 'SIMPLE_USER';
