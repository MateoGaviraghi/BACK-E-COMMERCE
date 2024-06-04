import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsString({ message: 'El correo electrónico debe ser una cadena de texto' })
  @ApiProperty({ 
    description: 'El correo electrónico es obligatorio, El correo electrónico debe ser una cadena de texto',
   example: 'mateo@gmail.com'
  })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15, { message: 'La contraseña no puede tener más de 15 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/, {
    message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial',
  })
  @ApiProperty({ 
    description: 'La contraseña es obligatoria, La contraseña debe ser una cadena de texto, La contraseña debe tener al menos 8 caracteres, La contraseña no puede tener más de 15 caracteres, La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial',
   example: 'Mateo1234@'
  })
  password: string;
}