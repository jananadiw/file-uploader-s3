import { Req, Res, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from './entity/image.repository';
import { images } from './entity/image.entity';
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
    @InjectRepository(images)
    private imageRepository: ImageRepository,
  ) {}

  findAll(): Promise<images[]> {
    return this.imageRepository.find();
  }

  getOneById(id: number): Promise<images> {
    return this.imageRepository.findOneOrFail(id);
  }

  /**
   * @param image
   * @returns create image object
   */
  add(image: images): Promise<images> {
    const newImage = this.imageRepository.create(image);
    console.log('new Image', newImage);

    return this.imageRepository.save(newImage); // insert images, if does not exist update.
  }

  /**
   * @param image
   * @returns updated image object
   */
  async updateImage(id: number, caption: string): Promise<images> {
    const image = await this.getOneById(id);

    image.caption = caption;
    return this.imageRepository.save(image); // update
  }

  /**
   * @param image
   * @returns deleted image object
   */
  async deleteImage(id: number): Promise<images> {
    const image = await this.getOneById(id);

    return this.imageRepository.remove(image);
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
