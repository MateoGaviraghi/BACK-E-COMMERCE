import { Injectable } from '@nestjs/common';
import { OrdersReposiroty } from './orders.repository';
import { Users } from 'src/entities/Users.entity';
import { OrderDetails } from 'src/entities/OrderDetails.entity';


@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersReposiroty) {}
    
    async getOrders(id: string) {
        return await this.ordersRepository.getOrders(id)
    }
   async addOrders(userId: string, products: any): Promise<Partial<OrderDetails>> {
       return await this.ordersRepository.addOrders(userId, products)
    }
}
