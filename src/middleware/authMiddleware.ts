import { NextFunction, Request, Response } from "express";
import { verifyAccessJWT } from "../jwt/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers || !req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "no req: headers/authorization found" });
  }

  console.log("зашли в authMiddleware");

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "no token found" });
  }
  console.log(token);
  try {
    const payload = verifyAccessJWT(token);
    req.userId = payload.userId;
    console.log("зашли в try/catch payload. далее - next()");
    next();
  } catch (error) {
    return res.status(400).json({ message: "Not valid token" });
  }
};
