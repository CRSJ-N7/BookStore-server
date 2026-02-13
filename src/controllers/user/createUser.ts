import { Request, Response } from "express";
import userRepository from "../../db/userRepository";
import { UserResponseDto } from "../../dto/UserResponseDto";
import { CreateUserDto } from "../../dto/CreateUserDto";
import bcrpyt from "bcrypt";

export const createUser = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response<UserResponseDto | { message: string }>,
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "все поля обязательны к заполнению" });
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ message: "email не валиден" });
  }

  const isUserExist = await userRepository.find({ where: { email: email } });
  if (isUserExist.length) {
    return res
      .status(400)
      .json({ message: `User with ${email} already exist` });
  }

  const hashedPassword = await bcrpyt.hash(password, 10);

  const newUser = userRepository.create({
    email,
    password: hashedPassword,
  });

  await userRepository.save(newUser);

  const safeUser: UserResponseDto = {
    id: newUser.id,
    email: newUser.email,
  };

  return res.status(201).json(safeUser);
};
