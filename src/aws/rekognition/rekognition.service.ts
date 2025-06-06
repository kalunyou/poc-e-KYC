import {
  CompareFacesCommand,
  CompareFacesResponse,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RekognitionService {
  constructor(private readonly configService: ConfigService) {}

  private getBucketNameString(): string {
    return this.configService.get('NEST_AWS_S3_BUCKET_NAME');
  }

  async compareFaces(
    sourceImage: string,
    targetImage: string,
  ): Promise<CompareFacesResponse> {
    const client = new RekognitionClient({
      region: this.configService.get('NEST_AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('NEST_AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('NEST_AWS_SECRET_ACCESS_KEY'),
      },
    });

    const params = {
      SourceImage: {
        S3Object: {
          Bucket: this.getBucketNameString(),
          Name: sourceImage,
        },
      },
      TargetImage: {
        S3Object: {
          Bucket: this.getBucketNameString(),
          Name: targetImage,
        },
      },
      SimilarityThreshold: 70,
    };

    const command = new CompareFacesCommand(params);

    return await client.send(command);
  }
}
