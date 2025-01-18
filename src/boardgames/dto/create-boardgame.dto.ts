import { CustomBoolean } from '../../comics/dto/create-comic.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBoardgameDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  players: string;

  @IsString()
  @IsNotEmpty()
  age: string;

  @IsString()
  @IsNotEmpty()
  creator: string;

  @IsString()
  @IsNotEmpty()
  illustrator: string;

  @IsString()
  @IsNotEmpty()
  distributor: string;

  @IsString()
  @IsNotEmpty()
  production_company: string;

  @IsString()
  @IsNotEmpty()
  games_category: string;

  @IsString()
  @IsNotEmpty()
  playing_time: string;

  @IsEnum(['BASSA', 'MEDIA', 'ALTA', 'ALTISSIMA', 'INDEFINITA'])
  @IsNotEmpty()
  complexity: Complexity;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @IsNotEmpty()
  mancolista: CustomBoolean
}

export enum Complexity {
  BASSA = 'BASSA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  ALTISSIMA = 'ALTISSIMA',
  INDEFINITA = 'INDEFINITA'
}
