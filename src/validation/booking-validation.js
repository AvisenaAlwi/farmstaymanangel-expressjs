import Joi from 'joi';

const validate = Joi.object({
  noBooking: Joi.string(),
  startDate: Joi.string(),
  endDate: Joi.string(),
  totalPrice: Joi.number().positive(),
  roomId: Joi.number().integer().positive(),
  guestId: Joi.number().integer().positive(),
  bookingMethod: Joi.string().valid('WhatsApp', 'Booking.com', 'GoogleMaps','Airbnb'),
  paymentMethod: Joi.string().valid('Cash', 'Bank Transfer', 'PayPal'),
  paymentStatus: Joi.string().valid('Pending', 'Completed', 'Failed'),
  paymentDate: Joi.string()
});

export default validate;

