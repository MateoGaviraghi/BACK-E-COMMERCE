import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../Dtos/LoginUserDto.dto';
import { CreateUserDto } from '../Dtos/CreateUserDto.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
 constructor(
  private readonly authService: AuthService,) {}

 @Get()
 getAuth() {
    return this.authService.getAuth()
 }

 @Post('/signin')
 
 createAuth(@Body() credentials: LoginUserDto){
   const { email, password } = credentials;
   return this.authService.singin(email, password)
 }


 @HttpCode(201)
  @Post('signup')
   singUp(@Body() createUserDto: CreateUserDto){
      return  this.authService.singUp(createUserDto)
    }
}
