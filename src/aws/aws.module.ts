import { Module } from '@nestjs/common';

import { S3StorageService } from 'src/aws/storage/s3-storage.service';
import { RekognitionService } from 'src/aws/rekognition/rekognition.service';

@Module({
  imports: [],
  controllers: [],
  providers: [S3StorageService, RekognitionService],
})
export class AwsModule {}
