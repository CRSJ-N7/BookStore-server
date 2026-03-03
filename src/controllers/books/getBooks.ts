import { Request, Response } from "express";
import bookRepository from "../../db/bookRepository";

export const getBooks = async (req: Request, res: Response) => {
  const params = req.query;
  console.log("zashli");
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
      } as any;

      const orderKey = keys[value as string] || "id";
      bR.orderBy({
        [orderKey]: "ASC",
      });
    }
  }

  const filteredBooks = await bR.getMany();

  return res.status(200).json(filteredBooks);
};
