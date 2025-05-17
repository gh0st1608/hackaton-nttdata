import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthLoginDto {

  
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  refreshToken: string;
}
