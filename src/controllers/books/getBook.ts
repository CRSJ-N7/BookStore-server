import { Request, Response } from "express";
import bookRepository from "../../db/bookRepository";

export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);

  if (!id) {
    return res.json({ message: "no id found" });
  }
  const numberId = +id;

  const book = await bookRepository.findOne({ where: { id: numberId } });

  return res.json(book);
};
