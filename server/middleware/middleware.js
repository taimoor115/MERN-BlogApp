import ExpressError from "../ExpressError.js";
import { blogSchema } from "../schemaValidation.js";

export default function validateBlog(req, res, next) {
  const { error } = blogSchema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    return next(new ExpressError(400, errorMessage));
  }

  next();
}
