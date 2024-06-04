import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Categories } from "./Categories.entity";
import { OrderDetails } from "./OrderDetails.entity";

@Entity({ name: 'products' })
export class Products {
   
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({ unique: true, length: 50 })
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    
    @Column({ type: 'int', nullable: false })
    stock: number;

    @Column({ nullable: true })
    imgUrl: string;


    @ManyToOne(() => Categories, category => category.products)
    category: Categories;

    
    @ManyToMany(() => OrderDetails)
    orderDetails: OrderDetails[];
}
