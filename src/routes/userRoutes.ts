import { Router } from "express";
import { getUsers } from "../controllers/user/getUsers";
import { createUser } from "../controllers/user/createUser";
import { loginUser } from "../controllers/user/loginUser";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", authMiddleware, loginUser);

export default router;
