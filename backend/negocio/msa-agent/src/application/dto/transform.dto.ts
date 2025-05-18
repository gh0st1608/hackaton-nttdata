import { IsString } from 'class-validator';

export class TransformBoletaDto {
  @IsString()
  imageBase64: string;

  @IsString()
  target: string;

  @IsString()
  imageName: string;
}