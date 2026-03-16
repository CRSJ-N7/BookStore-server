import { Router } from "express";
import { getCartItems } from "../controllers/cart/getCartItems";
import { authMiddleware } from "../middleware/authMiddleware";
import { addCartItem } from "../controllers/cart/addCartItem";
import { updateQuantity } from "../controllers/cart/updateQuantity";
import { removeCartItem } from "../controllers/cart/removeCartItem";
import { validate } from "../middleware/validate";
import quantity from "../validation/quantity";
import booksIdNumber from "../validation/booksIdNumber";

const router = Router();

router.use(authMiddleware);
router.get("/", getCartItems);
router.patch("/", validate({ body: quantity }), updateQuantity);
router.use(validate({ body: booksIdNumber }));
router.post("/", addCartItem);
router.delete("/", removeCartItem);

export default router;
