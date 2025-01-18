import { IsNotEmpty, IsString } from 'class-validator';


export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  bg_color: string

  @IsString()
  @IsNotEmpty()
  bg_image: string
}
