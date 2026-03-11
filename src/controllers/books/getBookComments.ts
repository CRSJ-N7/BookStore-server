import { Request, Response } from "express";
import commentRepository from "../../db/commentRepository";

export const getBookComments = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("getComments:", id);

  const comments = await commentRepository.find({
    where: { book: { id: +id } },
    relations: {
      user: true,
    },
    order: {
      createdAt: "ASC",
    },
  });

  console.log(comments);

  return res.json(comments);
};
