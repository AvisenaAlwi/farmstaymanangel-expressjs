import Joi from 'joi';

const validate = Joi.object({
  name: Joi.string().min(4).max(100),
  guestimg: Joi.string().max(200),
  email: Joi.string().max(200),
  phoneNumber: Joi.string().max(200),
  countryId: Joi.number().max(500),
});

export default validate;
