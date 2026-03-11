import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Entity()
@Unique(["user", "book"])
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.rates, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Book, (book) => book.rates, { onDelete: "CASCADE" })
  book: Book;

  @Column({ type: "int", default: 0 })
  value: number;
}
