import { Router } from "express";
import { shootBooks } from "../controllers/books/shootBooks";
import { getBooks } from "../controllers/books/getBooks";
import { getGenres } from "../controllers/books/getGenres";

const router = Router();

router.post("/shoot", shootBooks);
router.get("/", getBooks);
router.get("/genres", getGenres);

export default router;
