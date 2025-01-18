import { UserRole } from './create-user.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthInfoDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEnum(['ADMIN', 'SUPERVISOR', 'EDITOR', 'SIMPLE_USER'])
  @IsNotEmpty()
  role: UserRole;

  @IsString()
  @IsNotEmpty()
  archCollAuth: string;

  @IsNumber()
  expireIn?: number;
}
