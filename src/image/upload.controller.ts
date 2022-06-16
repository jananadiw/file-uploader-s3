import { Controller, Post, Get, Body } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResponseDTO } from '../image/image.dto';
import { images } from './entity/image.entity';

@Controller('images')
export class UploadController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async getImages(): Promise<ImageResponseDTO[]> {
    return await this.imageService.findAll();
  }

  @Get()
  async getImage(id: number): Promise<ImageResponseDTO> {
    return await this.imageService.getOneById(id);
  }

  @Post()
  async create(@Body() body: images): Promise<ImageResponseDTO> {
    try {
      await this.imageService.add(body);
    } catch (error) {
      return error;
    }
  }
}
