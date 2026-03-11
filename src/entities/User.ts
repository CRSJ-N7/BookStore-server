import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartItem } from "./CartItem";
import { Book } from "./Book";
import { Rate } from "./Rate";
import { Comment } from "./Comment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true, unique: false })
  name: string | null;

  @Column({ type: "varchar", nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "varchar", nullable: true, unique: false })
  avatar: string | null;

  @ManyToMany(() => Book, (book) => book.favouritedBy)
  @JoinTable()
  favourites: Book[];

  @OneToMany(() => Rate, (rate) => rate.user)
  rates: Rate[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
