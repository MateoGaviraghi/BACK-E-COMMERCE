import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Products } from "./products.entity";

@Entity({ name: 'categories' })
export class Categories  {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({unique: true, length: 50 })
  name: string;

  @OneToMany(() => Products,(product) => product.category )
  products: Products[];
}