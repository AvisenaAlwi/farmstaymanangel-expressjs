import Joi from 'joi';

const validate = Joi.object({
  title: Joi.string().min(4).max(100),
  description: Joi.string().max(5000),
  serviceimg: Joi.string()
});

export default validate;
