import ExpressError from "../ExpressError.js";
import { blogValidator, userValidator } from "../schemaValidation.js";

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
