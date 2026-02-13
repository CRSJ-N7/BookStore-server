import { Response, Request } from "express";
import userRepository from "../../db/userRepository";
import { UserResponseDto } from "../../dto/UserResponseDto";

export const getMe = async (
  req: Request,
  res: Response<UserResponseDto | { message: string }>,
) => {
  console.log("зашли в get me");
  const { userId } = req;
  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const safeUser = {
    id: user.id,
    email: user.email,
  };

  res.status(200).json(safeUser);
};
