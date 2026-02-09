import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "terrifclyTOP-SECRETkey";

export interface AuthRequest extends Request {
  userId?: number;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers || !req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "no req: headers/authorization found" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "no token found" });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.userId = payload.userId;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Not valid token" });
  }
};
