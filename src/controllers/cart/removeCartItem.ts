import { Request, Response } from "express";
import cartRepository from "../../db/cartRepository";

export const removeCartItem = async (req: Request, res: Response) => {
  const { userId } = req;
  const { bookId } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!bookId) {
    return res.status(400).json({ message: "No book id" });
  }

  const removedItem = await cartRepository.findOne({
    where: { user: { id: userId }, book: { id: bookId } },
  });

  if (!removedItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  await cartRepository.remove(removedItem);
  return res.status(200).json({ message: "Item removed from cart" });
};
