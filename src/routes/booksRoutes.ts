import { Router } from "express";
import { shootBooks } from "../controllers/books/shootBooks";

const router = Router();

router.post("/shoot", shootBooks);

export default router;
