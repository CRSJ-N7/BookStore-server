import { Request, Response } from "express";
import { verifyRefreshJWT, signAccessJWT } from "../../jwt/jwt";
import userRepository from "../../db/userRepository";

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    const payload = verifyRefreshJWT(refreshToken);
    if (!payload) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await userRepository.findOne({
      where: { id: payload.userId },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const accessToken = signAccessJWT(user.id);

    res.status(200).json({ accessToken });
  } catch (err) {
    console.error(err);
    return res
      .status(401)
      .json({ message: "Refresh token invalid or expired" });
  }
};
