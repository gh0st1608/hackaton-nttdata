import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class AuthRegisterDto {

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  email: string;

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  password: string;

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  name: string;

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  lastname: string;

}
