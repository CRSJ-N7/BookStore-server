import { Request, Response } from "express";
import cartRepository from "../../db/cartRepository";

export const getCartItems = async (req: Request, res: Response) => {
  const { userId } = req;

  const items = await cartRepository.find({
    where: { user: { id: userId } },
    relations: ["book"],
  });

  let totalPrice = 0;

  for (let key of items) {
    totalPrice = totalPrice + key.quantity * key.book.price;
  }

  totalPrice = Math.round(totalPrice * 100) / 100;

  const response = { items, totalPrice };

  return res.status(200).json(response);
};
