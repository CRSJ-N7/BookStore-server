import { Request, Response } from "express";
import bookRepository from "../../db/bookRepository";

export const getBooks = async (req: Request, res: Response) => {
  const params = req.query;
  if (!params) {
    return res.json({ message: "no search params" });
  }

  const keys = Object.entries(req.query);

  const bR = bookRepository.createQueryBuilder("book");

  for (let [key, value] of keys) {
    if (key === "min") {
      console.log(`зашли в ${key}, значение: ${value}`);
      bR.andWhere("book.price >= :minPrice", { minPrice: value });
    }
    if (key === "max") {
      console.log(`зашли в ${key}, значение: ${value}`);

      bR.andWhere("book.price <= :maxPrice", { maxPrice: value });
    }
    if (key === "genres" && value && typeof value === "string") {
      console.log(`зашли в ${key}, значение: ${value}`);

      const valuesLength = value.split(",").length;
      const values = Array.from(value.split(","));

      for (let i = 0; i < valuesLength; i++) {}
      bR.andWhere("book.genre IN (:...genres)", { genres: values });
    }
    if (key === "sortBy") {
      const keys = {
        Name: "name",
        "Author name": "author",
        Price: "price",
        Rating: '"avgRating"',
      } as any;

      const orderKey = keys[value as string] || "id";
      console.log(orderKey, "orderkey");
      bR.orderBy({
        [orderKey]: "ASC",
      });
    }
  }

  const page = Number(req.query.page) || 1;
  const booksPerPage = 12;
  const skip = (page - 1) * booksPerPage;

  bR.skip(skip).take(booksPerPage);

  const [filteredBooks, total] = await bR.getManyAndCount();

  return res.status(200).json({
    filteredBooks,
    total,
    totalPages: Math.ceil(total / booksPerPage),
  });
};
