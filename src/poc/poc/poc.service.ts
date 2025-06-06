import { Injectable } from '@nestjs/common';

import { AzureAiVisionGatewayService } from 'src/azure-ai-vision-gateway/azure-ai-vision-gateway/azure-ai-vision-gateway.service';
import { FaceDetectionRequest } from 'src/azure-ai-vision-gateway/azure-ai-vision-gateway/types/request';
import { PocVerifyDto } from 'src/poc/poc/dto/poc-verify.dto';

@Injectable()
export class PocService {
  constructor(
    private readonly azureAiVisionGatewayService: AzureAiVisionGatewayService,
  ) {}

  async verify(dto: PocVerifyDto) {
    const detectBody: FaceDetectionRequest = {
      imageContent: dto.file.buffer,
    };

    const detect = await this.azureAiVisionGatewayService.detect(detectBody);
    if (detect[0].faceId && detect[1].faceId) {
      const verifyBody = {
        faceId1: detect[0].faceId,
        faceId2: detect[1].faceId,
      };
      return this.azureAiVisionGatewayService.verify(verifyBody);
    }
  }
}
