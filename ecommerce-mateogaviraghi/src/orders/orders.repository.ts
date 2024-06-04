import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "../entities/OrderDetails.entity";
import { Orders } from "../entities/Orders.entity";
import { Products } from "../entities/products.entity";
import { Users } from "../entities/Users.entity";
import { Repository } from "typeorm";


@Injectable()
export class OrdersReposiroty {
constructor(
@InjectRepository( Orders)
private ordersReposiroty: Repository<Orders>,
@InjectRepository(Products)
private productsRepository: Repository<Products>,
@InjectRepository(OrderDetails)
private orderDetailsRepository: Repository<OrderDetails>,
@InjectRepository(Users)
private UsersRepository: Repository<Users>
) {} 


async addOrders(userId: string, products: any ): Promise<Partial<OrderDetails>> {
let total = 0;
const user = await this.UsersRepository.findOneBy({id: userId}) 

if (!user) {
    throw new NotFoundException('User not found')
}

const orderDate = new Date();


const productsArray = await Promise.all(
    products.map( async (element) => {
        const product = await this.productsRepository.findOneBy({
            id: element.id
        })
        if (!product) {
            return 'product not found'
        }
        total += Number(product.price)
         await this.productsRepository.update(
             {id: element.id},
             {stock: product.stock - 1}
            )
            return product
        })  
    )
    const orderDetail = new OrderDetails()
    
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    await this.orderDetailsRepository.save(orderDetail)
    
    
    const newOrder = new Orders();
    newOrder.user = user;
    newOrder.date = orderDate;
    newOrder.orderDetails = orderDetail

   
   


 await this.ordersReposiroty.save(newOrder)

 const {id, price} = orderDetail

 return {id, price}

} 


async getOrders(id: string) {
    
    const order = await this.ordersReposiroty.findOne({
        where: {id},
        relations: {orderDetails: {
            products: true
        }}
    })
    console.log(order);
    
    if (!order) {
        return 'order not found'
    }
    return order
}
}