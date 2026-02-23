import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
