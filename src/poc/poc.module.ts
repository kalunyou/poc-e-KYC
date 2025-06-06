import { Module } from '@nestjs/common';
import { AzureAiVisionGatewayModule } from 'src/azure-ai-vision-gateway/azure-ai-vision-gateway.module';

import { PocController } from 'src/poc/poc/poc.controller';
import { PocService } from 'src/poc/poc/poc.service';

@Module({
  imports: [AzureAiVisionGatewayModule],
  controllers: [PocController],
  providers: [PocService],
  exports: [],
})
export class PocModule {}
