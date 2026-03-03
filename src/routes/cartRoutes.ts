import { Router } from "express";
import { getCartItems } from "../controllers/cart/getCartItems";
import { authMiddleware } from "../middleware/authMiddleware";
import { addCartItem } from "../controllers/cart/addCartItem";
import { updateQuantity } from "../controllers/cart/updateQuantity";
import { removeCartItem } from "../controllers/cart/removeCartItem";

const router = Router();

router.use(authMiddleware);
router.get("/", getCartItems);
router.post("/", addCartItem);
router.patch("/", updateQuantity);
router.delete("/", removeCartItem);

export default router;
