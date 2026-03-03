import { Router } from "express";
import { shootBooks } from "../controllers/books/shootBooks";
import { getBooks } from "../controllers/books/getBooks";
import { getGenres } from "../controllers/books/getGenres";
import { getBook } from "../controllers/books/getBook";
import { getFavourites } from "../controllers/books/getFavourites";
import { toggleFavourites } from "../controllers/books/toggleFavourites";

const router = Router();

router.post("/shoot", shootBooks);
router.get("/", getBooks);
router.get("/genres", getGenres);
router.get("/:id", getBook);
router.get("/favourites", getFavourites);
router.patch("/favourites/:id", toggleFavourites);

export default router;
