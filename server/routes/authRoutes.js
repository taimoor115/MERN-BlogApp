import express from "express";
import { getMe, login, logout, signup } from "../controller/authController.js";
import {
  privateRoute,
  protectedRoute,
  validateUser,
} from "../middleware/middleware.js";
const router = express.Router();

router.post("/signup", privateRoute, validateUser, signup);

router.post("/login", privateRoute, login);

router.post("/logout", protectedRoute, logout);

router.get("/me", protectedRoute, getMe);

export default router;
