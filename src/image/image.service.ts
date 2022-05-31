import { Req, Res, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from './entity/image.repository';
import { Image } from './entity/image.entity';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import 'dotenv/config';

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: ImageRepository,
  ) {}

  findAll(): Promise<Image[]> {
    return this.imageRepository.find();
  }
  // s3 upload service
  async fileupload(@Req() req, @Res() res) {
    try {
      this.upload(req, res, function (error) {
        if (error) {
          console.log(error);
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        return res.status(201).json(req.files[0].location);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: AWS_S3_BUCKET_NAME,
      acl: 'private',
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
    }),
  }).array('upload', 1);
}
