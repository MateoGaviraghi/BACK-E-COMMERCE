import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../entities/Categories.entity';
import { Repository } from 'typeorm';
import * as data from '../data.json'


@Injectable()
export class categoriesReposiroty {
    constructor(@InjectRepository(Categories)
    private categoriesReposiroty: Repository<Categories>) {}

    async getCategories () {
        return await this.categoriesReposiroty.find()
    }

    async addCategories() {
        data?.map(async(element) => {
            await this.categoriesReposiroty
            .createQueryBuilder()
            .insert()
            .into(Categories)
            .values({name: element.category})
            .onConflict(`("name") DO NOTHING`)
            .execute()
        });

        return 'Categories added'
    }
} 