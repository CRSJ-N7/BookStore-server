import { Request, Response } from "express";
import commentRepository from "../../db/commentRepository";

export const getBookComments = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const comments = await commentRepository.find({
    where: { book: { id: +bookId } },
    relations: {
      user: true,
    },
    order: {
      createdAt: "ASC",
    },
  });

  return res.json(comments);
};
