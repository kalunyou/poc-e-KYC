import { Module } from '@nestjs/common';

import { PocController } from 'src/poc/poc/poc.controller';
import { PocService } from 'src/poc/poc/poc.service';
import { S3StorageService } from 'src/aws/storage/s3-storage.service';
import { RekognitionService } from 'src/aws/rekognition/rekognition.service';

@Module({
  imports: [],
  controllers: [PocController],
  providers: [PocService, S3StorageService, RekognitionService],
  exports: [],
})
export class PocModule {}
