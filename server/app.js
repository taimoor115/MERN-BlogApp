import express from "express";
import { MongoURL, PORT } from "./config.js";
import mongoose from "mongoose";
import Blog from "./model/blogModel.js";
import ExpressError from "./ExpressError.js";

import validateBlog from "./middleware/middleware.js";
const app = express();

// Middleware
app.use(express.json());

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

app.get("/blogs/:id", async (req, res) => {});

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
