import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartItem } from "./CartItem";
import { User } from "./User";

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

  @ManyToMany(() => User, (user) => user.favourites)
  favouritedBy: User[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.book)
  cartItems: CartItem[];
}
