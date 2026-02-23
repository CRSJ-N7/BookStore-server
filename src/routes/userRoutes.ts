import { Router } from "express";
import { createUser } from "../controllers/user/createUser";
import { loginUser } from "../controllers/user/loginUser";
import { authMiddleware } from "../middleware/authMiddleware";
import { getMe } from "../controllers/user/getMe";
import { refreshToken } from "../controllers/user/refreshToken";
import { updateUserInfo } from "../controllers/user/updateUserInfo";
import { updateUserPassword } from "../controllers/user/updatePassword";
import { uploadAvatar } from "../controllers/user/uploadAvatar";
import { shootBooks } from "../controllers/books/shootBooks";

const router = Router();

router.post("/auth/sign-up", createUser);
router.post("/auth/login", loginUser);
router.get("/me", authMiddleware, getMe);
router.post("/refresh", refreshToken);
router.post("/shoot", shootBooks);
router.use(authMiddleware);
router.put("/me/update", updateUserInfo);
router.put("/me/password", updateUserPassword);
router.put("/upload-avatar", uploadAvatar);

export default router;
