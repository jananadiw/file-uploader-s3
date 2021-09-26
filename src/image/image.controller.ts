import { Controller, Post, Get, Req, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResponseDTO } from '../image/image.dto';

@Controller('fileupload')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async getImages(): Promise<ImageResponseDTO[]> {
    return await this.imageService.findAll();
  }

  @Post()
  async create(@Req() request, @Res() response) {
    try {
      await this.imageService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}
