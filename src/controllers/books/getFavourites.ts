import { Request, Response } from "express";
import userRepository from "../../db/userRepository";

export const getFavourites = async (req: Request, res: Response) => {
  const { userId } = req;

  console.log(userId);

  console.log("зашли в getFavourites");

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ["favourites"],
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user.favourites);
};
