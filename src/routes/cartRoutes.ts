import { Router } from "express";
import { getCartItems } from "../controllers/cart/getCartItems";
import { authMiddleware } from "../middleware/authMiddleware";
import { addCartItem } from "../controllers/cart/addCartItem";

const router = Router();

router.use(authMiddleware);
router.get("/", getCartItems);
router.post("/", addCartItem);

export default router;
