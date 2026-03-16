import { Request, Response } from "express";
import commentRepository from "../../db/commentRepository";
import userRepository from "../../db/userRepository";
import bookRepository from "../../db/bookRepository";

export const createComment = async (req: Request, res: Response) => {
  const { userId } = req;
  const { text, bookId } = req.body;

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  const book = await bookRepository.findOne({
    where: { id: bookId },
  });

  if (!user || !book) {
    return res.status(404).json({ message: "User or book not found" });
  }

  const comment = commentRepository.create({
    text,
    user,
    book,
  });

  await commentRepository.save(comment);

  return res.status(201).json(comment);
};
