import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { PocService } from 'src/poc/poc/poc.service';
import { PocVerifyDto } from 'src/poc/poc/dto/poc-verify.dto';

@ApiTags('pocs')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('pocs')
export class PocController {
  constructor(private readonly pocService: PocService) {}

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'sourceImage', maxCount: 1 },
      { name: 'targetImage', maxCount: 1 },
    ]),
  )
  @Post('verify')
  async verify(
    @Body() dto: PocVerifyDto,
    @UploadedFiles()
    files: {
      sourceImage?: Express.Multer.File[];
      targetImage?: Express.Multer.File[];
    },
  ) {
    dto.sourceImage = files.sourceImage[0];
    dto.targetImage = files.targetImage[0];
    return this.pocService.verify(dto);
  }
}
