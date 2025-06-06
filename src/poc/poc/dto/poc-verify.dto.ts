import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PocVerifyDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  // @IsNotEmpty()
  @ApiProperty({ type: 'file' })
  file: any;
}
