import express from "express";
import { MongoURL, PORT } from "./config.js";
import mongoose from "mongoose";
import ExpressError from "./ExpressError.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
main()
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MongoURL);
}

app.use("/blogs", blogRoutes);
app.use("/", authRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("404", "Page not found"));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`);
});
