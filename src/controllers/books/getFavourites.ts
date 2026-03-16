import { Request, Response } from "express";
import userRepository from "../../db/userRepository";

export const getFavourites = async (req: Request, res: Response) => {
  const { userId } = req;

  console.log("зашли в getFavourites");

  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ["favourites"],
  });

  return res.json(user?.favourites);
};
