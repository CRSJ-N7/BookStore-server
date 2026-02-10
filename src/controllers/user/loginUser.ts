import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../../db/userRepository";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "terrifclyTOP-SECRETkey";

type LoginReq = {
  email: string;
  password: string;
};

export const loginUser = async (
  req: Request<{}, {}, LoginReq>,
  res: Response, // а можно ли response здесь типизировать? или не надо?
) => {
  const { email, password } = req.body;

  const user = await userRepository.findOne({ where: { email: email } });

  if (!user) return res.status(404).json({ message: "нет такого юзера" });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "неверный пароль" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  return res.status(200).json({ token });
};
