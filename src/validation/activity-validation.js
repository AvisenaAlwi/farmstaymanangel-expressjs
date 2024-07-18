import Joi from 'joi';

const validate = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  type: Joi.string().min(1).required(),
  date: Joi.date().required(),
  activityimg: Joi.string(),
  guestId: Joi.number().integer().positive().required(),
});

export default validate;
