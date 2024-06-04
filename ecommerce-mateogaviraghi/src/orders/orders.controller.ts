import { Body, Controller, Get, Post, HttpException, HttpStatus, ParseUUIDPipe, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../Dtos/CreateOrderDto.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/entities/Users.entity';
import { OrderDetails } from 'src/entities/OrderDetails.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersServices: OrdersService ) {}

    @Post() 
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async addOrder(@Body() order: CreateOrderDto): Promise<Partial<OrderDetails>> {
     const {userId, products} = order;
     return await this.ordersServices.addOrders(userId, products)
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getOrders(@Param('id', ParseUUIDPipe) id: string) {
        
        try {
            const orders = await this.ordersServices.getOrders(id);
            return { success: true, orders };
        } catch (error) {
            throw new HttpException('Error fetching orders', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
