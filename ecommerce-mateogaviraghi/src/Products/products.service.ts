import { Injectable } from '@nestjs/common';
import { ProductosRepository } from './products.repository';
import { ProductsDto } from '../Dtos/ProductsDto.dto';
import { UpdateProductsDto } from '../Dtos/updateProductsDto.dto';

@Injectable()
export class ProductsService {
    
    constructor(private readonly productsRepository: ProductosRepository) {}
    
    async getProducts(page: number, limit: number):Promise<ProductsDto[]> {
        return await this.productsRepository.getProducts(page, limit)
     }
    
    
     async getProductsById(id: string): Promise<ProductsDto> {
         return await this.productsRepository.getById(id)
     }
    
    
     async addProdcut() {
        return await this.productsRepository.addProducts()
    }

    async createUsers(product: ProductsDto) : Promise<string> {
        return await this.productsRepository.createProducts(product)
    }
    
    async putProductsById(id: string, updateProduct: Partial<UpdateProductsDto>): Promise<string> {
         return await this.productsRepository.putProductsById(id, updateProduct)
     }

    deleteProducts(id: string): Promise <string>  {
        return this.productsRepository.deleteProducts(id)
     }
}
