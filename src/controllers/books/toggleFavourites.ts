import { Request, Response } from "express";
import userRepository from "../../db/userRepository";
import bookRepository from "../../db/bookRepository";

export const toggleFavourites = async (req: Request, res: Response) => {
  const { userId } = req;
  const { bookId } = req.params;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!bookId) {
    return res.status(400).json({ message: "Book id not found in req.body" });
  }

  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ["favourites"],
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const book = await bookRepository.findOne({ where: { id: +bookId } });

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const isAlreadyFavourite = user.favourites.some((fav) => fav.id === book.id);

  if (isAlreadyFavourite) {
    user.favourites = user.favourites.filter((fav) => fav.id !== book.id);
    await userRepository.save(user);
    return res
      .status(200)
      .json({ message: `${book.name} removed from favourite` });
  }

  user.favourites.push(book);
  await userRepository.save(user);

  return res.status(200).json({ message: `${book.name} added to favourites` });
};
