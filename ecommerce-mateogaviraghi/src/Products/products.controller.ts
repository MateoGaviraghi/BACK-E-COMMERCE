import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDto } from '../Dtos/ProductsDto.dto';
import { UpdateProductsDto } from '../Dtos/updateProductsDto.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../Auth/roles.enum';
import { RolesGuard } from '../guards/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get() 
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    async getProducts(@Query('page') page: number = 1, @Query('limit') limit: number = 5
     ) {
     return await this.productsService.getProducts(page, limit)
    }

    @Get('seeder') 
    async addProducts() {
     return await this.productsService.addProdcut()
    }  

    
     @HttpCode(201)
     @Post()
     async createProducts(@Body() product: ProductsDto): Promise<string> {
           return await this.productsService.createUsers(product) 
         }
        
         @HttpCode(200) 
         @Put(':id')
       async  updateProductsById(@Param('id', ParseUUIDPipe) id: string, @Body() updateProduct: Partial<UpdateProductsDto>): Promise<string> {
         const productId = await this.productsService.putProductsById(id, updateProduct)
         if (!productId) {
            throw new NotFoundException ('Product not found')
         }
        return  productId
         }
                
         @HttpCode(200)
         @Delete(":id") 
         
       async  deleteProductsById(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
         const productId = await this.productsService.deleteProducts(id)
        if (!productId) {
         throw new NotFoundException ('Product not found')
         }
       return  productId
         }

         @HttpCode(200)
         @Get(':id')
         @ApiBearerAuth()
       @Roles(Role.Admin)
       @UseGuards(AuthGuard, RolesGuard)
       async productsById(@Param('id', ParseUUIDPipe) id: string) {
       return await this.productsService.getProductsById(id)
  }
  
 }
                    