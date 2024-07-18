import Joi from 'joi';

const validate = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  roomimg: Joi.string().max(200),
  price: Joi.number().positive().required(),
  capacity: Joi.number().integer().positive().required(),
});

export default validate;