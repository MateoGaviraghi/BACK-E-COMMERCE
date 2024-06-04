import { Injectable } from "@nestjs/common";
import * as data from '../data.json'
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "../entities/products.entity";
import { Repository } from "typeorm";
import { Categories } from "../entities/Categories.entity";
import { ProductsDto } from "../Dtos/ProductsDto.dto";
import { UpdateProductsDto } from "../Dtos/updateProductsDto.dto";


@Injectable()
export class ProductosRepository{
   
constructor(@InjectRepository(Products)
private productsRepository: Repository<Products>,
@InjectRepository(Categories)
private categoriesRepository: Repository<Categories>) {}

 
    async getProducts(page: number, limit: number):Promise<ProductsDto[]> {
const products = await this.productsRepository.find({
  relations: {
    category: true
  }
})
      const start = (page - 1) * limit;
      const end = start + limit;
  
      const productsSlice = products.slice(start, end);
  
      return productsSlice;
  }
    
   async getById(id: string): Promise<ProductsDto> {
     const product = await this.productsRepository.findOne({where: {id}})
     if (!product) {
      return null
     }
     return product
    }
    
   async addProducts()  {
      const categories = await this.categoriesRepository.find();
      data?.map(async (element) => {
    const category = categories.find(
      (category) => category.name === element.category,
    )
   const product = new Products();
   product.name = element.name;
   product.description = element.description;
   product.price = element.price;
   product.imgUrl = element.imgUrl;
   product.stock = element.stock;
   product.category = category

   await this.productsRepository
   .createQueryBuilder()
   .insert()
   .into(Products)
   .values(product)
   .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
   .execute()
      })

      return 'Product added'

    }
    

   async createProducts(product: ProductsDto) : Promise<string>{
    const newProduct = this.productsRepository.create(product);
    await this.productsRepository.save(newProduct)
    return newProduct.id
   }

   async putProductsById(id: string, updateProduct: Partial<UpdateProductsDto>): Promise<string> {
      const product = await this.productsRepository.findOne({where: {id}})
      if (!product) {
        return null
      } 
    await this.productsRepository.update(id, updateProduct)
    return id
    }
   

   async deleteProducts(id: string): Promise <string> {
     const productFound = await this.productsRepository.findOne({where: {id}})
     await this.productsRepository.delete(productFound.id)
     return productFound.id
  }
  }