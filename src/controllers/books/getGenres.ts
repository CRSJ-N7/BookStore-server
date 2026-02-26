import { Request, Response } from "express";
import bookRepository from "../../db/bookRepository";

export const getGenres = async (req: Request, res: Response) => {
  const genresData = await bookRepository
    .createQueryBuilder("book")
    .select("book.genre", "genre")
    .distinct(true)
    .getRawMany();

  //   const genres = genresData.reduce((acc, item) => {
  //     const newGenre = Object.values(item);
  //     acc.push(newGenre[0]);
  //     return acc;
  //   }, []);

  const genres = genresData.map((item) => item.genre);

  return res.status(200).json(genres);
};
