import express from "express";
import { getMe, login, logout, signup } from "../controller/authController.js";
import { protectedRoute, validateUser } from "../middleware/middleware.js";
const router = express.Router();

router.post("/signup", validateUser, signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", protectedRoute, getMe);

export default router;
