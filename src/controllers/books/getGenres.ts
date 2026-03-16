import { Request, Response } from "express";
import bookRepository from "../../db/bookRepository";

export const getGenres = async (req: Request, res: Response) => {
  const genresData = await bookRepository
    .createQueryBuilder("book")
    .select("book.genre", "genre")
    .distinct(true)
    .getRawMany();

  const genres = genresData.map((item) => item.genre);

  return res.status(200).json(genres);
};
