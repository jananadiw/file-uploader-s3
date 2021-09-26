import { Module } from '@nestjs/common';
import { SqlConfigService } from './config.service';

@Module({
  providers: [SqlConfigService],
})
export class SqlConfigModule {}
