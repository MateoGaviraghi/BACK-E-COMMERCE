import { IsNotEmpty, IsNumber, IsOptional, IsString,  MaxLength } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { Categories } from 'src/entities/Categories.entity';
import { OrderDetails } from 'src/entities/OrderDetails.entity';

export class ProductsDto {
  /**
   * Nombre del producto.
   * 
   * @example 'Camiseta'
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  /**
   * Descripción del producto.
   * 
   * @example 'Camiseta de algodón en color negro'
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * Precio del producto.
   * 
   * @example 29.99
   */
  @IsNotEmpty()
  @IsNumber()
  price: number;

  /**
   * Cantidad en stock del producto.
   * 
   * @example 100
   */
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  /**
   * URL de la imagen del producto (opcional).
   * 
   * @example 'https://example.com/images/camiseta.jpg'
   */
  @IsOptional()
  @IsString()
  imgUrl: string;

  /**
   * Categoría a la que pertenece el producto (opcional).
   * 
   * @example { id: '3f3b8e21-6e9e-4f36-a66e-8ef0aeb6e0b1' }
   */
  @IsOptional()
  category: DeepPartial<Categories>; 

  /**
   * Detalles de órdenes relacionados con este producto (opcional).
   * 
   * @example [{ id: '1', quantity: 2 }]
   */
  @IsOptional()
  orderDetails: DeepPartial<OrderDetails>[]; 
}
