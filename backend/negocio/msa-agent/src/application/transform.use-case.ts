import { Injectable } from '@nestjs/common';
import { TransformBoletaDto } from './dto/transform.dto';
import { OpenAiReceiptAgent } from '../infrastructure/repository/openai-receipt-agent.repository';
import { NearReceiptUploader } from '../infrastructure/repository/near-receipt-uploader.repository';
import { GoogleImageLoaderService } from '../infrastructure/repository/read-image.repository';

@Injectable()
export class TransformApplication {
  constructor(
    private readonly aiService: OpenAiReceiptAgent,
    private readonly nearService: NearReceiptUploader,
    private readonly googleService: GoogleImageLoaderService
  ) {}

  async transformReceipt(dto: TransformBoletaDto) {
    const {target, imageName} = dto
    const imageBase64 = await this.googleService.downloadImageAsBase64(target,imageName);
    const jsonReceipt = await this.aiService.transformImageToJson(imageBase64);
    console.log('jsonReceipt',jsonReceipt)
    /* const txResult = await this.nearService.upload(jsonReceipt); */
    return {
      jsonReceipt,
      /* transaction: txResult, */
    };
  }
}
