import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./src/db/db.js";
import authRouter from "./src/router/authRouter.js";
import courseRouter from "./src/router/courseRouter.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://leikhub.com",
      "https://www.leikhub.com",
      "http://localhost:3000",
    ],
  })
);

connectDB()
  .then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });

app.get("/api", (req, res) => {
  res.send("API is healthy");
});

app.use("/api", authRouter, courseRouter);
