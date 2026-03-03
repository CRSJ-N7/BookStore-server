import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  Unique,
} from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
@Unique(["user", "book"])
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cartItems, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Book, (book) => book.cartItems, { onDelete: "CASCADE" })
  book: Book;

  @Column({ type: "int", default: 1 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;
}
