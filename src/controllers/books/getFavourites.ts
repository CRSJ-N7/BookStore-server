import { Request, Response } from "express";
import userRepository from "../../db/userRepository";

export const getFavourites = async (req: Request, res: Response) => {
  const { userId } = req;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const favourites = await userRepository.find({
    where: { id: userId },
    relations: ["favourites"],
  });

  return res.json(favourites);
};
