import { Controller, Post, Body } from '@nestjs/common';
import { ValidateBoletaUseCase, ValidateBoletaDTO } from '../application/validate.use-case';

@Controller('boleta')
export class BoletaController {
  constructor(private readonly useCase: ValidateBoletaUseCase) {}

  @Post()
  async verificar(@Body() dto: ValidateBoletaDTO) {
    const valid = await this.useCase.execute(dto);
    return { valid };
  }
}