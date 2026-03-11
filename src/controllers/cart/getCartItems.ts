import { Request, Response } from "express";
import cartRepository from "../../db/cartRepository";

export const getCartItems = async (req: Request, res: Response) => {
  const { userId } = req;

  const cartItems = await cartRepository.find({
    where: { user: { id: userId } },
    relations: ["book"],
  });

  let totalPrice = 0;
  let totalItems = 0;

  for (let key of cartItems) {
    totalPrice = totalPrice + key.quantity * key.book.price;
    totalItems += 1;
  }

  totalPrice = Math.round(totalPrice * 100) / 100;

  const items = cartItems.map((item) => ({
    ...item.book,
    quantity: item.quantity,
  }));

  return res.status(200).json({ items, totalPrice, totalItems });
  // return res.status(200).json([response]); // genius blyat
};
