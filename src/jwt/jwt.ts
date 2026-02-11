import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const signJWT = (userId: number): string => {
  const token = jwt.sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.accessExpiresIn,
  });

  return token;
};

export const verifyJWT = (token: string): { userId: number } => {
  return jwt.verify(token, config.jwt.secret) as { userId: number };
};

export const refreshToken = () => {};
