import express from "express";
import { MongoURL, PORT } from "./config.js";
import mongoose from "mongoose";
import Blog from "./model/blogModel.js";
import ExpressError from "./ExpressError.js";
import { validateBlog, validateUser } from "./middleware/middleware.js";
import Auth from "./model/authModel.js";
import "dotenv/config";
import { generateTokenAndSetCookie } from "./lib/utils/genrateToken.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
const app = express();
import cors from "cors";
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

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({});

    if (!blogs) {
      return res.status(500).json({
        error: "No blogs found",
      });
    }
    return res.json({
      data: blogs,
      count: blogs.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

app.get("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(400).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/blogs", validateBlog, async (req, res) => {
  console.log(req.body);
  try {
    const blogData = req.body;

    // if (!blogData.title) {
    //   return res.status(400).json({ error: "Title is required" });
    // }
    const blog = await Blog.create(blogData);
    return res.status(201).json(blog);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.put("/blogs/:id", validateBlog, async (req, res) => {
  try {
    const { id } = req.params;
    const blog = req.body;

    // if (!blog.title) {
    //   return res.status(400).json({ error: "Title is required" });
    // }
    const result = await Blog.findByIdAndUpdate(id, blog, {
      runValidators: true,
      new: true,
    });
    if (!result) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
});

app.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Blog.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json({ error: "No Blog Found" });
    }
    return res.status(200).json({ message: "Book deleted Successfull" });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
});

// User

app.post("/signup", validateUser, async (req, res) => {
  try {
    const { email } = req.body;
    const existingEmail = await Auth.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "This email has already taken" });
    }
    const user = req.body;
    const newUser = await Auth.create(user);

    if (!newUser) {
      res.status(400).json({ error: "Invalid user data" });
    }

    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      username: newUser.username,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Enter username and password" });
    }
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid Email and Password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Email and Password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
});

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
