import { Request, Response } from "express";
import userRepository from "../../db/userRepository";

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim().length) {
        return res.status(400).json({ message: "Wrong name. Try another one" });
      }
    }

    if (name === undefined && email === undefined) {
      return res
        .status(400)
        .json({ message: "Bad request. No email/name found" });
    }

    if (email !== undefined) {
      if (typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ message: "email не валиден" });
      }
    }

    let isEmailExist;

    if (email !== undefined) {
      isEmailExist = await userRepository.findOne({
        where: { email },
      });

      if (isEmailExist && isEmailExist.id !== userId) {
        return res.status(400).json({
          message: "Email already exist. Try another one",
        });
      }
    }

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    await userRepository.save(user);

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user info" });
  }
};
