import { Request, Response } from "express";
import app from "./app";
import { AppDataSource } from "./data-source";
import { config } from "./config/config";
import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

AppDataSource.initialize()
  .then(() => {
    console.log("DataSource initialized, DB connected");

    app.listen(config.server.port, () => {
      console.log(`Server started on http://localhost:${config.server.port}`);
    });
  })
  .catch((err) => {
    console.error("error connetction to db:", err);
  });
