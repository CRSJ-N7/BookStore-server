import { Router } from "express";
import { shootBooks } from "../controllers/books/shootBooks";
import { getBooks } from "../controllers/books/getBooks";
import { getGenres } from "../controllers/books/getGenres";
import { getBook } from "../controllers/books/getBook";
import { getFavourites } from "../controllers/books/getFavourites";
import { toggleFavourites } from "../controllers/books/toggleFavourites";
import { authMiddleware } from "../middleware/authMiddleware";
import { getBookRating } from "../controllers/books/getRating";
import { rateBook } from "../controllers/books/rateBook";
import { getBookComments } from "../controllers/books/getBookComments";
import { createComment } from "../controllers/books/createComment";
import { validate } from "../middleware/validate";
import commentSchema from "../validation/books/commentSchema";
import booksId from "../validation/books/booksId";
import rateValue from "../validation/books/rateValue";

const router = Router();

router.post("/shoot", shootBooks);
router.get("/", getBooks);
router.get("/genres", getGenres);
router.get("/comments/:bookId", validate({ params: booksId }), getBookComments);
router.get("/:bookId/rating", validate({ body: rateValue }), getBookRating);
router.get("/favourites", authMiddleware, getFavourites);
router.patch(
  "/favourites/:bookId",
  authMiddleware,
  validate({ params: booksId }),
  toggleFavourites,
);
router.patch(
  "/rate/:bookId",
  authMiddleware,
  validate({ body: booksId }),
  rateBook,
);
router.post(
  "/comments",
  authMiddleware,
  validate({ body: commentSchema }),
  createComment,
);

router.get("/:bookId", validate({ params: booksId }), getBook);

export default router;
