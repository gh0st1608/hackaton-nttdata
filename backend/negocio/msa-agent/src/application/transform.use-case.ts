import { Injectable } from '@nestjs/common';
import { TransformBoletaDto } from './dto/transform.dto';
import { OpenAiReceiptAgent } from '../infrastructure/repository/openai-receipt-agent.repository';
import { NearReceiptUploader } from '../infrastructure/repository/near-receipt-uploader.repository';

@Injectable()
export class TransformApplication {
  constructor(
    private readonly aiService: OpenAiReceiptAgent,
    private readonly nearService: NearReceiptUploader,
  ) {}

  async transformBoleta(dto: TransformBoletaDto) {
    const jsonBoleta = await this.aiService.transformImageToJson(dto.imageBase64);
    const txResult = await this.nearService.upload(jsonBoleta);
    return {
      jsonBoleta,
      transaction: txResult,
    };
  }
}
