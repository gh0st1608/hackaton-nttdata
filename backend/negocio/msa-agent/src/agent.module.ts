import { Module } from '@nestjs/common';
import { TransformApplication } from './application/transform.use-case';
import { AgentController } from './infrastructure/agent.controller';
import { OpenAiReceiptAgent } from './infrastructure/repository/openai-receipt-agent.repository';
import { NearReceiptUploader } from './infrastructure/repository/near-receipt-uploader.repository';

@Module({
  controllers: [AgentController],
  providers: [
    TransformApplication,
    OpenAiReceiptAgent,
    NearReceiptUploader,
  ],
})
export class AgentModule {}
