import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { AzureAiVisionGatewayService } from 'src/azure-ai-vision-gateway/azure-ai-vision-gateway/azure-ai-vision-gateway.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [AzureAiVisionGatewayService],
  exports: [AzureAiVisionGatewayService],
})
export class AzureAiVisionGatewayModule {}
