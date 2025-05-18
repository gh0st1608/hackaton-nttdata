import { Controller, Post, Body } from '@nestjs/common';
import { TransformApplication } from '../application/transform.use-case';
import { TransformBoletaDto} from '../application/dto/transform.dto'

@Controller()
export class AgentController {
  constructor(private readonly transformApplication: TransformApplication) {}

  @Post('transform')
  async transform(@Body() target: TransformBoletaDto) {
    return await this.transformApplication.transformReceipt(target);
  }
}
