import { Controller, Post, Req, Res } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('fileupload')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
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
