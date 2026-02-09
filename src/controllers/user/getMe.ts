import { Response } from "express";
import userRepository from "../../db/userRepository";
import { AuthRequest } from "../../middleware/authMiddleware";

export const getMe = async (req: AuthRequest, res: Response) => {
  const { userId } = req;
  console.log("bla-bla");
  const user = await userRepository.find({ where: { id: userId } });
  console.log("bla-bla2");
  res.status(200).json(user);
};
