import express from "express";
import homepageRouter from "./homepageRouter.js";

const port = process.env.PORT || 3000;

const app = express();

app.get("/api/v1/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
});

app.use(homepageRouter);

app.listen(port, () => {
  console.log("Server listening on port", port);
});
