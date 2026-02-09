import { Request, Response } from "express";
import userRepository from "../../db/userRepository";
import { UserResponseDto } from "../../dto/UserResponseDto";

//тестовый контроллер, потом можно убрать
export const getUsers = async (
  req: Request,
  res: Response<UserResponseDto[] | { message: string }>,
) => {
  console.log("зашли");
  const users = await userRepository.find();

  const response: UserResponseDto[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));

  if (!response.length) {
    return res.json({ message: "no users found" });
  }
  return res.status(200).json(response);
};
