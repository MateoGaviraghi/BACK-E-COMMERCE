import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Orders } from "./Orders.entity";
import { Products } from "./products.entity";

@Entity({ name: 'orderDetails' })
export class OrderDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Orders, order => order.orderDetails)
  order: Orders;

  @ManyToMany(() => Products)
  @JoinTable()
  products: Products[];
}