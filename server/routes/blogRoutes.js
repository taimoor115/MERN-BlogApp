import express from "express";
const router = express.Router();
import {
  getBlogs,
  showBlog,
  createBlog,
  updateBlog,
  destroyBlog,
} from "../controller/blogController.js";
import { validateBlog } from "../middleware/middleware.js";

router.get("/", getBlogs);

router.get("/:id", showBlog);

router.post("/", validateBlog, createBlog);

router.put("/:id", validateBlog, updateBlog);

router.delete("/:id", destroyBlog);

export default router;
