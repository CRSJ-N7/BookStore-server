import "dotenv/config";
import { SignOptions } from "jsonwebtoken";

export const config = {
  server: {
    port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000,
  },

  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER || "sergey",
    password: process.env.DB_PASSWORD || "12345",
    database: process.env.DB_NAME || "bookstore",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "super-terrifclyTOP-key",
    accessExpiresIn:
      (process.env.ACCESS_EXPIRES_IN as SignOptions["expiresIn"]) || "10min",
    refreshExpiresIn:
      (process.env.REFRESH_EXPIRES_IN as SignOptions["expiresIn"]) || "15d",
  },
};
