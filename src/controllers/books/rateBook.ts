import { Request, Response } from "express";
import rateRepository from "../../db/rateRepository";
import bookRepository from "../../db/bookRepository";
import userRepository from "../../db/userRepository";

export const rateBook = async (req: Request, res: Response) => {
  const { userId } = req;
  const { rateValue, bookId } = req.body;

  console.log(`Rate value:`, rateValue, "bookId:", bookId);

  if (!bookId) {
    return res.status(400).json({ message: "Book id required" });
  }

  if (rateValue < 1 || rateValue > 5) {
    return res.status(400).json({ message: "Rate must be between 1 and 5" });
  }

  const user = await userRepository.findOne({ where: { id: userId } });
  const book = await bookRepository.findOne({ where: { id: bookId } });

  if (!user || !book) {
    return res.status(404).json({ message: "User or Book not found" });
  }

  let rate = await rateRepository.findOne({
    where: { user: { id: userId }, book: { id: bookId } },
  });

  if (rate) {
    rate.value = rateValue;
  } else {
    rate = rateRepository.create({
      user,
      book,
      value: rateValue,
    });
  }

  await rateRepository.save(rate);

  const allRatings = await rateRepository.find({
    where: { book: { id: bookId } },
    select: ["value"],
  });

  const sum = allRatings.reduce((acc, r) => acc + r.value, 0);
  const avgRating = allRatings.length
    ? parseFloat((sum / allRatings.length).toFixed(1))
    : 0;

  console.log(`Sum: ${sum}, Count: ${allRatings.length}, Avg: ${avgRating}`);

  book.avgRating = avgRating;
  await bookRepository.save(book);

  return res.status(200).json({
    message: "Book rating updated",
    avgRating,
  });
};
