import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "./entities/User";
import { config } from "./config/config";
import { Book } from "./entities/Book";
import { CartItem } from "./entities/CartItem";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: false,
  logging: false,
  entities: [User, Book, CartItem],
  migrationsTableName: "my_migrations",
  migrations: [__dirname + "/migrations/**/*{.js,.ts}"],
  subscribers: [],
});
