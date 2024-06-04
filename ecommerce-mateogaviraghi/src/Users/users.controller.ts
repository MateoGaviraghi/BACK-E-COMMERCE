import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';
import { Users } from '../entities/Users.entity';
import { CreateUserDto } from '../Dtos/CreateUserDto.dto';
import { Role } from '../Auth/roles.enum';
import { Roles } from '../decorators/roles.decorators';
import { RolesGuard } from '../guards/roles.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userServices: UsersService,
    ) {}
    
    
    @HttpCode(200)
    @Get()
    @ApiBearerAuth()
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
     async getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5): Promise<Partial<Users>[]> {
        return await this.userServices.getUsers(page, limit)
    }

    @Get('admin')
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getAdmin() {
       return 'protected route'
    }
    @Get('auth0/protected')
    getAuth0Protected(@Req() req: Request) {
        console.log(req.oidc.accessToken);
        
        return JSON.stringify(req.oidc.user)
    }

    @HttpCode(200) 
    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async updateUserById(@Param('id', ParseUUIDPipe) id: string, @Body() updateUser: CreateUserDto): Promise<string> {
    const userId = await this.userServices.putUserById(id, updateUser)
    if (!userId) {
        throw new NotFoundException('User not found')
    }
    return userId
    }

    @HttpCode(200)
    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async deleteUsersById(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
        const userId = await this.userServices.deleteUser(id)
        if (!userId) {
            throw new NotFoundException('User not found')
        }
        return  userId
    }



    @HttpCode(200)
    @Get(':id') 
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async userById(@Param('id', ParseUUIDPipe) id: string): Promise<Omit<Users, 'password'>>   {
        return await this.userServices.getUserById(String(id))
    }
    
}
