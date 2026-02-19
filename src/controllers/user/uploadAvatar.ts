import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import userRepository from "../../db/userRepository";

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    console.log("зашли в uploadAvatar");

    const { userId } = req;
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const base64data = image.split(",")[1];
    const buffer = Buffer.from(base64data, "base64");

    const uploadDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.avatar) {
      const oldPath = path.join(uploadDir, user.avatar);
      console.log(`oldPath >> `, oldPath);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        console.log("сделали unlick oldPath");
      }
    }

    // а как формат выбирать? или можно просто png всегда? а вдруг там будет jpeg или это в валидации делать?
    const fileName = `avatar-${userId}-${Date.now()}.png`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    user.avatar = fileName;
    await userRepository.save(user);

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };

    return res.json({
      safeUser,
      message: "Avatar uploaded",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Upload failed" });
  }
};
