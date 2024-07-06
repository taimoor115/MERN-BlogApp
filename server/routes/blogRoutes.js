import express from "express";
const router = express.Router();
import {
  getBlogs,
  showBlog,
  createBlog,
  updateBlog,
  destroyBlog,
} from "../controller/blogController.js";
import { protectedRoute, validateBlog } from "../middleware/middleware.js";

router.route("/").get(getBlogs).post(protectedRoute, validateBlog, createBlog);

router
  .route("/:id")
  .get(showBlog)
  .put(protectedRoute, validateBlog, updateBlog)
  .delete(protectedRoute, destroyBlog);

router;

export default router;
