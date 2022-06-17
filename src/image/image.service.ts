import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from './entity/image.repository';
import { images } from './entity/image.entity';
import 'dotenv/config';
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
}
