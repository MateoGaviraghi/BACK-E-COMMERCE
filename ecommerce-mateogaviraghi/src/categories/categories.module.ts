import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from '../entities/Categories.entity';
import { categoriesReposiroty } from './categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoriesController],
  providers: [CategoriesService, categoriesReposiroty],
  exports: [CategoriesService]
})
export class CategoriesModule {}

