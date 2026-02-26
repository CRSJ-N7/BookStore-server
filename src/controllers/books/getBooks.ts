import { Request, Response } from "express";
import bookRepository from "../../db/bookRepository";

export const getBooks = async (req: Request, res: Response) => {
  const books = await bookRepository.find();

  res.status(200).json(books);
  console.log(books);
  return;
};
