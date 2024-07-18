import Joi from "joi";

export const registrationValidation = Joi.object({
  username: Joi.string().min(4).max(100).required(),
  name: Joi.string().min(4).max(100).required(),
  gender: Joi.string().required(),
  role: Joi.string().required(),
  password: Joi.string().min(8).max(100).required(),
  token: Joi.string().max(100),
});
