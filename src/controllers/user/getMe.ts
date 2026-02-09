import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const getMe = (req: Request, res: Response) => {
  const JWT_SECRET = process.env.JWT_SECRET || "terrifclyTOP-SECRETkey";
};
