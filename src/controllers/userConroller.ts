import { Request, Response } from "express";
import userRepository from "../db/userRepository";
import { UserResponseDto } from "../dto/UserResponseDto";
import { CreateUserDto } from "../dto/CreateUserDto";

export const getUsers = async (
  req: Request,
  res: Response<UserResponseDto[] | UserResponseDto>,
) => {
  const users = await userRepository.find();

  const response: UserResponseDto[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));
  return res.status(200).json(response);
};

export const createUser = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response,
) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json(400).json({ message: "все поля обязательны к заполнению" });
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return res.json(400).json({ message: "email не валиден" });
  }
};
