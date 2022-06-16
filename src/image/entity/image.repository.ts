import { EntityRepository, Repository } from 'typeorm';
import { images } from './image.entity';

@EntityRepository(images)
export class ImageRepository extends Repository<images> {}
