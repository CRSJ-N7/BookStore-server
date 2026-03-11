import { Request, Response } from "express";
import bookRepository from "../../db/bookRepository";

export const getBookRating = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  if (!bookId) {
    return res.status(400).json({ message: "Book id required" });
  }

  const book = await bookRepository.findOne({
    where: { id: Number(bookId) },
    select: ["id", "avgRating"],
  });

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.json({ avgRating: book.avgRating });
};
