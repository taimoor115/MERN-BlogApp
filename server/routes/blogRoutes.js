import express from "express";
import {
  getBlogs,
  showBlog,
  createBlog,
  updateBlog,
  destroyBlog,
} from "../controller/blogController.js";
const router = express.Router();

router.get("/blogs", getBlogs);

router.get("/blogs/:id", showBlog);

router.post("/blogs", validateBlog, createBlog);

router.put("/blogs/:id", validateBlog, updateBlog);

router.delete("/blogs/:id", destroyBlog);

export default router;
