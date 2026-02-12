import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const signAccessJWT = (userId: number): string => {
  const token = jwt.sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.accessExpiresIn,
  });

  return token;
};

export const verifyAccessJWT = (token: string): { userId: number } => {
  const verified = jwt.verify(token, config.jwt.secret) as { userId: number };
  return verified;
};

export const signRefreshJWT = (userId: number): string => {
  const token = jwt.sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });

  return token;
};
export const verifyRefreshJWT = (token: string): { userId: number } => {
  const verified = jwt.verify(token, config.jwt.secret) as { userId: number };
  return verified;
};
