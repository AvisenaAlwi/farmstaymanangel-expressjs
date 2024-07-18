import Joi from 'joi';

const validate = Joi.object({
  title: Joi.string().min(1),
  description: Joi.string(),
  galleryimg: Joi.string().min(1),
  guestId: Joi.number().integer().positive(),
});

export default validate;