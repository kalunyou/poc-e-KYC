import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PocModule } from 'src/poc/poc.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PocModule,
    AwsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
