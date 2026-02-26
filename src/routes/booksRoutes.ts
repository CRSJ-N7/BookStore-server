import { Router } from "express";
import { shootBooks } from "../controllers/books/shootBooks";
import { getBooks } from "../controllers/books/getBooks";

const router = Router();

router.post("/shoot", shootBooks);
router.get("/", getBooks);

export default router;
