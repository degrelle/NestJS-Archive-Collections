import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class CreateComicDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  distribution: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  release_date: string;

  @IsEnum(['SETTIMANALE', 'QUINDICINALE', 'MENSILE', 'SEMETRALE', 'ANNUALE', 'VARIABILE'])
  @IsNotEmpty()
  periodicity: Periodicity;

  @IsNumber()
  @IsNotEmpty()
  n_volume: number;

  @IsNumber()
  @IsNotEmpty()
  in_progress: CustomBoolean;

  @IsNumber()
  @IsNotEmpty()
  mancolista: CustomBoolean;

  @IsNumber()
  @IsNotEmpty()
  is_unique: CustomBoolean;

  @IsNumber()
  @IsNotEmpty()
  total_volumes: number;
}

export enum CustomBoolean {
  true = 0,
  false
}

export enum Periodicity {
  SETTIMANALE = 'SETTIMANALE',
  QUINDICINALE = 'QUINDICINALE',
  MENSILE = 'MENSILE',
  SEMETRALE = 'SEMETRALE',
  ANNUALE = 'ANNUALE',
  VARIABILE = 'VARIABILE',
}
