import { Module } from '@nestjs/common';
import { TransformApplication } from './application/transform.use-case';
import { AgentController } from './infrastructure/agent.controller';
import { OpenAiReceiptAgent } from './infrastructure/repository/openai-receipt-agent.repository';
import { NearReceiptUploader } from './infrastructure/repository/near-receipt-uploader.repository';
import { ConfigModule } from '@nestjs/config';
import { GoogleImageLoaderService } from './infrastructure/repository/read-image.repository';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true, // hace que esté disponible en todos los módulos sin importar
        envFilePath: '.env',
      }),
      // otros módulos aquí...
    ],
  controllers: [AgentController],
  providers: [
    TransformApplication,
    OpenAiReceiptAgent,
    NearReceiptUploader,
    GoogleImageLoaderService
  ],
})
export class AgentModule {}
