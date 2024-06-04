import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../entities/Orders.entity';
import { OrdersReposiroty } from './orders.repository';
import { Users } from '../entities/Users.entity';
import { Products } from '../entities/products.entity';
import { OrderDetails } from '../entities/OrderDetails.entity';
import { UserRepository } from '../Users/users.repository';
import { ProductosRepository } from '../Products/products.repository';
import { Categories } from '../entities/Categories.entity';
import { categoriesReposiroty } from '../categories/categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Orders]),
            TypeOrmModule.forFeature([Users]),
           TypeOrmModule.forFeature([Products]) ,
            TypeOrmModule.forFeature([OrderDetails]),
              TypeOrmModule.forFeature([Categories])
          ],
  providers: [OrdersService , OrdersReposiroty, UserRepository, ProductosRepository, categoriesReposiroty],
  controllers: [OrdersController]
})
export class OrdersModule {}
