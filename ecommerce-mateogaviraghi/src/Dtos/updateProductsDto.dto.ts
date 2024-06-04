import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductsDto {
  /**
   * Nombre del producto (opcional).
   * 
   * @example 'Camiseta'
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @IsOptional()
  name: string;

  /**
   * Descripción del producto (opcional).
   * 
   * @example 'Camiseta de algodón en color negro'
   */
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * Precio del producto (opcional).
   * 
   * @example 29.99
   */
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  /**
   * Cantidad en stock del producto (opcional).
   * 
   * @example 100
   */
  @IsOptional()
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
}
