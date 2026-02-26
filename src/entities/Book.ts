import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./CartItem";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true, unique: false })
  author: string;

  @Column({ type: "varchar", nullable: true, unique: false })
  cover: string;

  @Column({ type: "varchar", nullable: true, unique: false })
  description: string;

  @Column({ type: "varchar", nullable: true, unique: false })
  genre: string;

  @Column({ type: "varchar", nullable: true, unique: false })
  name: string;

  @Column({ type: "float", nullable: true, unique: false })
  price: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.book)
  cartItems: CartItem[];
}
