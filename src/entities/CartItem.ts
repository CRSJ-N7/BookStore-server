import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cartItems, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Book, (book) => book.cartItems, { onDelete: "CASCADE" })
  book: Book;

  @CreateDateColumn()
  createdAt: Date;
}
