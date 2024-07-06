import "dotenv/config";
import { generateTokenAndSetCookie } from "../lib/utils/genrateToken.js";
import bcrypt from "bcrypt";
import User from "../model/userModel.js";

export const signup = async (req, res) => {
  try {
    const { email } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "This email has already taken" });
    }
    const user = req.body;
    const newUser = await User.create(user);

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
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Enter username and password" });
    }
    const user = await User.findOne({ email });

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
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.cookie("jwt", "", { maxAge: 0 });
    console.log("Helo I am working");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
};
