
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength, MaxLength, Matches, IsString, IsNumber, IsUUID, Validate, IsEmpty } from 'class-validator';
import { MatchPassword } from '../decorators/matchPassword.decorators';

export class CreateUserDto {
   

    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'El nombre no puede superar los 80 caracteres' })
    @IsString()
    @ApiProperty({
        description: 'El nombre es obligatorio, El nombre debe tener al menos 3 caracteres, El nombre no puede superar los 80 caracteres' ,
        example: 'Mateo'
    })
    name: string;

    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    @IsEmail()
    @IsString()
    @ApiProperty({
        description: 'El correo electrónico es obligatorio' ,
        example: 'mateo@gmail.com'
    })
    email: string;

    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, { message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(15, { message: 'La contraseña no puede superar los 15 caracteres' })
    @IsString()
    @ApiProperty({
        description: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*, La contraseña debe tener al menos 8 caracteres, La contraseña no puede superar los 15 caracteres' ,
        example: 'Mateo1234@'
    })
    password: string;

   @IsNotEmpty()
   @IsString()
   @Validate(
    MatchPassword ['password']
   )
   @ApiProperty({
    description: 'Debe ser identica a la contrseña que quieras crear' ,
    example: 'Mateo1234@'
})
    confirmPassword: string

    @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'La dirección no puede superar los 80 caracteres' })
    @IsString()
    @ApiProperty({
        description: 'La dirección debe tener al menos 3 caracteres, La dirección no puede superar los 80 caracteres' ,
        example: 'Corrientes 2651'
    })
    address: string;

    @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
    @IsNumber()
    @ApiProperty({
        description: 'El número de teléfono es obligatorio' ,
        example: 3425162081
    })
    phone: number;

    @MinLength(5, { message: 'El país debe tener al menos 5 caracteres' })
    @MaxLength(20, { message: 'El país no puede superar los 20 caracteres' })
    @IsString()
    @ApiProperty({
        description: 'El país debe tener al menos 5 caracteres, El país no puede superar los 20 caracteres' ,
        example: 'Argentina'
    })
    country: string;

    @MinLength(5, { message: 'La ciudad debe tener al menos 5 caracteres' })
    @MaxLength(20, { message: 'La ciudad no puede superar los 20 caracteres' })
    @IsString()
    @ApiProperty({
        description: 'La ciudad debe tener al menos 5 caracteres, La ciudad no puede superar los 20 caracteres' ,
        example: 'Santa Fe'
    })
    city: string;

    @IsEmpty()
     isAdmin: boolean
}

