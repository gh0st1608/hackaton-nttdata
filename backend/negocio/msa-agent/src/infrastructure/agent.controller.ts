import { Controller, Post, Body } from '@nestjs/common';
import { TransformApplication } from '../application/transform.use-case';
import { TransformBoletaDto} from '../application/dto/transform.dto'

@Controller('agents')
export class AgentController {
  constructor(private readonly transformApplication: TransformApplication) {}

  @Post('transform')
  async transform(@Body() imageBase64: TransformBoletaDto) {
    return await this.transformApplication.transformBoleta(imageBase64);
  }
}
