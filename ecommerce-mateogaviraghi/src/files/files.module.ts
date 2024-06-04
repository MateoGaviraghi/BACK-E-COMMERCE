import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

import { cloudinaryConfig } from '../config/cloudinary';
import { FilesRepository } from './files.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FilesController],
  providers: [FilesService, cloudinaryConfig, FilesRepository],
})
export class FilesModule {}
