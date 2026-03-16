import { Request, Response } from "express";
import bookRepository from "../../db/bookRepository";

export const getBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const book = await bookRepository.findOne({ where: { id: +bookId } });

  return res.status(200).json(book);
};
