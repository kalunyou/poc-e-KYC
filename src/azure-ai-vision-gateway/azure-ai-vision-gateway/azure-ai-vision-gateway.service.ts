import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';

import {
  FaceDetectionResponse,
  FaceVerificationResponse,
} from 'src/azure-ai-vision-gateway/azure-ai-vision-gateway/types/response';

@Injectable()
export class AzureAiVisionGatewayService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async azureAiVisionApi(
    method: 'post' | 'get',
    data: any,
    action: string,
    contentType: string,
  ) {
    const headersRequest = {
      apiKey: `${this.configService.get('NEST_AZURE_AI_VISION_KEY')}`,
      'Content-Type': contentType,
    };
    const url = `${this.configService.get(
      'NEST_AZURE_AI_VISION_URL',
    )}${action}`;
    const request = ((method) => {
      switch (method) {
        case 'post':
          return this.http
            .post(url, data, {
              headers: headersRequest,
            })
            .pipe(
              catchError((e) => {
                throw new Error(e);
              }),
            );
        case 'get':
          return this.http
            .get(url, {
              params: data,
              headers: headersRequest,
            })
            .pipe(
              catchError((e) => {
                throw new Error(e);
              }),
            );
      }
    })(method);

    const response = await firstValueFrom(request);
    return response.data;
  }

  async detect(data: any): Promise<FaceDetectionResponse[]> {
    const action = 'detect';
    return this.azureAiVisionApi(
      'post',
      data,
      action,
      'application/octet-stream',
    );
  }

  async verify(data: any): Promise<FaceVerificationResponse> {
    const action = 'verify';
    return this.azureAiVisionApi('post', data, action, 'application/json');
  }
}
