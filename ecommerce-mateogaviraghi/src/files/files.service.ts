import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../entities/products.entity';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(productId: string, file: Express.Multer.File) {
    const product = this.productsRepository.findOneBy({ id: productId });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const uploadImage = await this.filesRepository.uploadImage(productId, file);

    await this.productsRepository.update((await product).id, {
      imgUrl: uploadImage.secure_url,
    });
    return  'image uploaded successfully'
  }
}

