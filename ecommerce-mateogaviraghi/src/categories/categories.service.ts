import { Injectable } from '@nestjs/common';
import { categoriesReposiroty } from './categories.repository';


@Injectable()
export class CategoriesService {
    constructor(private categoriesRepository: categoriesReposiroty) {}

    addCategories() {
    return this.categoriesRepository.addCategories()
    }

    getCategories() {
        return this.categoriesRepository.getCategories()
    }
} 


