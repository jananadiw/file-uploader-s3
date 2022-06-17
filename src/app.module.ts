import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { UploadModule } from './upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SqlConfigModule } from './config/database/config.module';
import { SqlConfigService } from './config/database/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ImageModule,
    UploadModule,
    TypeOrmModule.forRootAsync({
      imports: [SqlConfigModule],
      useClass: SqlConfigService,
      inject: [SqlConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
