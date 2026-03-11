import { Request, Response } from "express";
import userRepository from "../../db/userRepository";
import bookRepository from "../../db/bookRepository";
import cartRepository from "../../db/cartRepository";

export const addCartItem = async (req: Request, res: Response) => {
  const { userId } = req;
  const { bookId } = req.body;

  if (!userId || !bookId) {
    return res.status(400).json({ message: "Bad request" });
  }

  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const book = await bookRepository.findOne({ where: { id: bookId } });
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const existingItem = await cartRepository.findOne({
    where: { user: { id: userId }, book: { id: bookId } },
  });

  if (existingItem) {
    existingItem.quantity += 1;
    await cartRepository.save(existingItem);
    return res.json(existingItem);
  }

  const cartItem = cartRepository.create({
    user,
    book,
  });

  await cartRepository.save(cartItem);

  return res
    .status(201)
    .json({
      cartItem,
      message: `User: ${cartItem.user.id} added book: ${cartItem.book.name} to cart `,
    });
};
