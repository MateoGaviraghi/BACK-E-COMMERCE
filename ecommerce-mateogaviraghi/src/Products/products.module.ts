import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductosRepository } from './products.repository';
import { Categories } from '../entities/Categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { categoriesReposiroty } from 'src/categories/categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Categories]),
            TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductosRepository],
  exports: [ProductsService]
})
export class ProductsModule {}
