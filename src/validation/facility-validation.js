import Joi from 'joi';

const validate = Joi.object({
  name: Joi.string().min(1).required(),
});

export default validate;
