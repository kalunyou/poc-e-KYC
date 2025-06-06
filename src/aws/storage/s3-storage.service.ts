import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3, CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class S3StorageService {
  constructor(private readonly configService: ConfigService) {}

  private getBucketNameString(): string {
    return this.configService.get('NEST_AWS_S3_BUCKET_NAME');
  }

  private getS3Client(): S3 {
    const credentials = (() => {
      return {
        accessKeyId: this.configService.get<string>('NEST_AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'NEST_AWS_SECRET_ACCESS_KEY',
        ),
      };
    })();

    const s3 = new S3({
      region: this.configService.get('NEST_AWS_REGION'),
      credentials,
    });

    return s3;
  }

  async upload(file: {
    body: Buffer | Blob;
    name: string;
  }): Promise<CompleteMultipartUploadCommandOutput> {
    const client = this.getS3Client();

    const upload = new Upload({
      client,
      params: {
        Bucket: this.getBucketNameString(),
        Key: file.name,
        Body: file.body,
      },
    });

    return upload.done();
  }
}
