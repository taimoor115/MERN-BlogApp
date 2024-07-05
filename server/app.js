import express from "express";
import { MongoURL, PORT } from "./config.js";
import mongoose from "mongoose";
import ExpressError from "./ExpressError.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
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

app.get("/", (req, res) => {
  res.send("Server working fine....");
});

app.use("/blogs", blogRoutes);
app.use("/", authRoutes);

// User

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
