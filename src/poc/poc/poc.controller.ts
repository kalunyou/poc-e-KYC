import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { PocService } from 'src/poc/poc/poc.service';
import { PocVerifyDto } from 'src/poc/poc/dto/poc-verify.dto';

@ApiTags('pocs')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('pocs')
export class PocController {
  constructor(private readonly pocService: PocService) {}

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('verify')
  async verify(
    @Body() dto: PocVerifyDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    dto.file = file;
    return this.pocService.verify(dto);
  }
}
