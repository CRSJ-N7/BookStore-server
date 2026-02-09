import { Router } from "express";
import { createUser, getUsers } from "../controllers/userConroller";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/me", createUser);

export default router;
