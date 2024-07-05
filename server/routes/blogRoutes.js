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

router.route("/").get(getBlogs).post(validateBlog, createBlog);

router
  .route("/:id")
  .get(showBlog)
  .put(validateBlog, updateBlog)
  .delete(destroyBlog);

router;

export default router;
