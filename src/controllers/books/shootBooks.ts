import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import bookRepository from "../../db/bookRepository";

export const shootBooks = async (req: Request, res: Response) => {
  console.log("зашли в shooBooks");
  const { author } = req.body;
  const { price } = req.body;
  const { description } = req.body;
  const { genre } = req.body;
  const { name } = req.body;
  const { cover } = req.body;

  // if (!author || !price || !description || !genre || !name || !cover) {
  //   return res.status(400);
  // }

  const base64data = cover.split(",")[1];
  const buffer = Buffer.from(base64data, "base64");

  const uploadDir = path.join(process.cwd(), "public");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const fileName = `book-${name}-${crypto.randomUUID()}.png`; // НИКОГДА НАХУЙ БОЛЬШЕ ИМЯ КНИГИ МЫ СЮДА НЕ СУËМ
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
