import Joi from "joi";

const validate = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

export default validate;
