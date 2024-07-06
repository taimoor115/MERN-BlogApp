import Joi from "joi";

export const blogValidator = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().allow(null, ""),
  caption: Joi.string().required(),
  publishDate: Joi.date(),
  category: Joi.string(),
  tags: Joi.array(),
});

export const userValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required().lowercase().email(),
  password: Joi.string().required(),
});
