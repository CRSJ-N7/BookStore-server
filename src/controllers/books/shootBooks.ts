import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import bookRepository from "../../db/bookRepository";

export const shootBooks = async (req: Request, res: Response) => {
  console.log("зашли в shooBooks");
  const { author } = req.body;
  console.log(author);
  const { price } = req.body;
  console.log(price);

  const { description } = req.body;
  console.log(description);

  const { genre } = req.body;
  console.log(genre);

  const { name } = req.body;
  console.log(name);

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

  const fileName = `book-${name}-${crypto.randomUUID()}.png`;
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
