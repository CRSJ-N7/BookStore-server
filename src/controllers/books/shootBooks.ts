import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import bookRepository from "../../db/bookRepository";
import { Book } from "../../entities/Book";

export const shootBooks = async (
  req: Request<Omit<Book, "id">>,
  res: Response<Omit<Book, "id">>,
) => {
  const { author, cover, price, description, genre, name } = req.body;

  const base64data = cover.split(",")[1];
  const buffer = Buffer.from(base64data, "base64");

  const uploadDir = path.join(process.cwd(), "public");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const fileName = `book-${name}-${crypto.randomUUID()}`;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, buffer);

  const book = {
    author,
    cover: fileName,
    price,
    description,
    genre,
    name,
  };

  await bookRepository.save(book);

  return res.status(201).json(book);
};
