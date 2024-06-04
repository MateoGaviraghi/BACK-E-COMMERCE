import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Orders } from "./Orders.entity";

@Entity({ name: 'users' })
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()
    
    @Column({type: 'varchar', length: 50, nullable: false })
    name: string;

    @Column({ length: 50, unique: true })
    email: string;

   @Column({ length: 60 })
   password: string;

  

   @Column({ type: 'bigint', nullable: true })
   phone: number;
   
   @Column({ length: 50, nullable: true })
   country: string;

   @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column({default: false})
  isAdmin: boolean
  
  @OneToMany(() => Orders, order => order.user)
  orders: Orders[];
}

