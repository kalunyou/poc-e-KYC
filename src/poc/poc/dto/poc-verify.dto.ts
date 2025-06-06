import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PocVerifyDto {
  //Do not send this field
  @IsOptional()
  @ApiPropertyOptional()
  readonly name: string;

  @ApiProperty({ type: 'file' })
  sourceImage: any;

  @ApiProperty({ type: 'file' })
  targetImage: any;
}
