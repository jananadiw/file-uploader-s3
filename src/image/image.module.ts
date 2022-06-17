import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { images } from './entity/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([images])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
