import { Request, Response } from "express";
import app from "./app";
import { AppDataSource } from "./data-source";

const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

AppDataSource.initialize()
  .then(() => {
    console.log("DataSource initialized, DB connected");

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("error connetction to db:", err);
  });
