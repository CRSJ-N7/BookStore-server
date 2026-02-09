import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: process.env.PORT ? parseInt(process.env.PORT) : 5432,
  username: process.env.USERNAME || "sergey",
  password: process.env.PASSWORD || "12345",
  database: process.env.DATABASE || "bookstore",
  synchronize: false,
  logging: false,
  entities: [User],
  migrationsTableName: "my_migrations",
  migrations: [__dirname + "/migrations/**/*{.js,.ts}"],
  subscribers: [],
});
