import express from "express";
import userRouter from "./routes/userRoutes";
import bookRouter from "./routes/booksRoutes";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "50mb" }));

app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));
app.use("/users", userRouter);
app.use("/books", bookRouter);

// TOOD: error handler

export default app;
