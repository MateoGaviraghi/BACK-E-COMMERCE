import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Products } from 'src/entities/products.entity';

export class CreateOrderDto {


    @IsUUID()
    @IsNotEmpty({ message: 'El userId es obligatorio' })
    @ApiProperty({
        description: 'El userId es obligatorio'
    })
    userId: string;

    
    @IsArray({ message: 'La lista de productos debe ser un array' })
    @ArrayMinSize(1)
    @ApiProperty({
        description: 'La lista de productos debe ser un array'
    })
    products: Partial<Products[]>
}