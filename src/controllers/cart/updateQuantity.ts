import { Request, Response } from "express";
import cartRepository from "../../db/cartRepository";

export const updateQuantity = async (req: Request, res: Response) => {
  const { userId } = req;
  const { bookId, quantity } = req.body;

  const item = await cartRepository.findOne({
    where: { user: { id: userId }, book: { id: bookId } },
  });

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (quantity === 0) {
    await cartRepository.remove(item);
    return res.json("Cart items removed");
  }

  item.quantity = quantity;
  const updatedItem = await cartRepository.save(item);

  return res.json(updatedItem);
};
