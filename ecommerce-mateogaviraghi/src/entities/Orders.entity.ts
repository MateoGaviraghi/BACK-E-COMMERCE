
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Users } from "./Users.entity";
import { OrderDetails } from "./OrderDetails.entity";

@Entity({ name: 'orders' })
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @ManyToOne(() => Users, user => user.orders)
    user: Users;
  
    @Column({ type: 'timestamp' })
    date: Date;
  
    @OneToOne(() => OrderDetails)
    @JoinColumn()
    orderDetails: OrderDetails;
}