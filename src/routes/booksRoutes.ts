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
import { updateQuantity } from "../controllers/cart/updateQuantity";
import { validate } from "../middleware/validate";
import commentSchema from "../validation/books/commentSchema";

const router = Router();

router.post("/shoot", shootBooks);
router.get("/", getBooks);
router.get("/genres", getGenres);
router.get("/comments/:id", getBookComments);
router.get("/:id/rating", getBookRating);
router.get("/favourites", authMiddleware, getFavourites);
router.patch("/favourites/:bookId", authMiddleware, toggleFavourites);
router.patch("/rate/:id", authMiddleware, rateBook);
router.post(
  "/comments",
  authMiddleware,
  validate({ body: commentSchema }),
  createComment,
);

router.get("/:id", getBook);

export default router;
