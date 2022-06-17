import { Controller, Post, Req, Res } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('fileupload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  async create(@Req() request, @Res() response) {
    try {
      await this.uploadService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}
