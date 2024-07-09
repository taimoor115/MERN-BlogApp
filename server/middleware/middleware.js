import ExpressError from "../ExpressError.js";
import User from "../model/userModel.js";
import { blogValidator, userValidator } from "../schemaValidation.js";
import jwt from "jsonwebtoken";
export function validateBlog(req, res, next) {
  const { error } = blogValidator.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    return next(new ExpressError(400, errorMessage));
  }

  next();
}

export function validateUser(req, res, next) {
  const { error } = userValidator.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    return next(new ExpressError(404, errorMessage));
  }
  next();
}

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: You must logged in..." });
    }
    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    // console.log(decoded);
    // console.log(decoded.userId);
    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;
    // console.log(user._id);
    // console.log("Hello", user);
    // console.log(req.user._id);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const privateRoute = (req, res, next) => {
  console.log(req.cookies.token);
  if (req.cookies.token) {
    return res.redirect("/blogs");
  }
  next();
};
