import express from "express";
import { login, signup } from "../controller/authController.js";
import { validateUser } from "../middleware/middleware.js";
const router = express.Router();

router.post("/signup", validateUser, signup);

router.post("/login", login);

export default router;
