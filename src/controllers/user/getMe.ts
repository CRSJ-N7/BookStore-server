import { Response } from "express";
import userRepository from "../../db/userRepository";
import { AuthRequest } from "../../middleware/authMiddleware";
import { UserResponseDto } from "../../dto/UserResponseDto";

export const getMe = async (
  req: AuthRequest,
  res: Response<UserResponseDto | { message: string }>,
) => {
  const { userId } = req;
  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  res.status(200).json(safeUser);
};
