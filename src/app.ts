import express from "express";
import userRouter from "./routes/userRoutes";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));
app.use("/users", userRouter);

// TOOD: error handler

export default app;
