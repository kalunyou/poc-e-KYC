import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PocVerifyDto } from 'src/poc/poc/dto/poc-verify.dto';
import { S3StorageService } from 'src/aws/storage/s3-storage.service';
import { RekognitionService } from 'src/aws/rekognition/rekognition.service';

@Injectable()
export class PocService {
  constructor(
    private readonly s3StorageService: S3StorageService,
    private readonly rekognitionService: RekognitionService,
  ) {}

  async verify(dto: PocVerifyDto) {
    const uploadImage = async (imageBuffer: Buffer, imageName: string) =>
      this.s3StorageService.upload({ body: imageBuffer, name: imageName });

    const [sourceImage, targetImage] = await Promise.all([
      uploadImage(dto.sourceImage.buffer, uuidv4()),
      uploadImage(dto.targetImage.buffer, uuidv4()),
    ]);

    if (!sourceImage || !targetImage) {
      throw new Error('Failed to upload image');
    }

    const response = await this.rekognitionService.compareFaces(
      sourceImage.Key,
      targetImage.Key,
    );
    return {
      similarity: response.FaceMatches[0].Similarity,
    };
  }
}
