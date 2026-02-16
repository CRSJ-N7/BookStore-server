import { Request, Response } from "express";
import userRepository from "../../db/userRepository";
import bcrpyt from "bcrypt";

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { userId } = req;

    console.log("USER ID: ", userId);
    const { password, newPassword, repeatedPassword } = req.body;
    console.log(password, newPassword, repeatedPassword);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comparePasswords = await bcrpyt.compare(password, user.password);
    if (!comparePasswords) {
      console.log(comparePasswords);
      return res.status(400).json({ message: "Wrong password" });
    }

    if (!(newPassword === repeatedPassword)) {
      return res.status(400).json({ message: "New passwords doesn't match" });
    }

    const hashedPassword = await bcrpyt.hash(newPassword, 10);

    user.password = hashedPassword;

    await userRepository.save(user);

    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user password" });
  }
};
