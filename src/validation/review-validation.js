import Joi from 'joi';

const validate = Joi.object({
  content: Joi.string().min(1),
  title: Joi.string().min(1),
  rating: Joi.number().integer().min(1).max(5),
  guestId: Joi.number().integer().positive(),
});

export default validate;