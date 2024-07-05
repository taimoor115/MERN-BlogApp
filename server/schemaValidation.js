import Joi from "joi";

export const blogSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().allow(null, ""),
  caption: Joi.string(),
  publishDate: Joi.date(),
  category: Joi.string(),
  tags: Joi.array(),
});
