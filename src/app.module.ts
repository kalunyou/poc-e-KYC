import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PocModule } from 'src/poc/poc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PocModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
