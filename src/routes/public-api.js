import express from 'express';
import userController from '../controllers/user-controller.js';
import farmserviceController from '../controllers/farmservice-controller.js';
import guestController from '../controllers/guest-controller.js';
import roomController from '../controllers/room-controller.js';
import bookingController from '../controllers/booking-controller.js';
import activityController from '../controllers/activity-controller.js';
import reviewController from '../controllers/review-controller.js';
import facilityController from '../controllers/facility-controller.js';
import multer from 'multer';
import storagefile from '../../utils/storagefile.js';
import countryController from '../controllers/country-controller.js';
import galleryController from '../controllers/gallery-controller.js';
import dashboardCountController from '../controllers/dashboard-count-controller.js';

const publicRouter = express.Router();

const createFileUploadMiddleware = (storage, fileField) => {
    return multer({ storage }).single(fileField);
  };

const fileUploadMiddlewareFarmService = createFileUploadMiddleware(storagefile.farmserviceImg, 'serviceimg');
const fileUploadMiddlewareGuest = createFileUploadMiddleware(storagefile.guestImg, 'guestimg');
const fileUploadMiddlewareRoom = createFileUploadMiddleware(storagefile.roomImg, 'roomimg');
const fileUploadMiddlewareGallery = createFileUploadMiddleware(storagefile.galleryImg, 'galleryimg');
const fileUploadMiddlewareActivity = createFileUploadMiddleware(storagefile.activityImg, 'activityimg');  // Assuming roomImg is the correct storage for rooms
// Assuming roomImg is the correct storage for rooms


publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login);


publicRouter.get('/api/service', farmserviceController.get);
publicRouter.get('/api/service/:id', farmserviceController.getById);
publicRouter.delete('/api/service/:id', farmserviceController.destroy);
publicRouter.post(
  '/api/service',
  fileUploadMiddlewareFarmService,
  farmserviceController.post
);
publicRouter.put(
'/api/service/:id',
fileUploadMiddlewareFarmService,
farmserviceController.update
);

publicRouter.get('/api/guest', guestController.get);
publicRouter.get('/api/guest/:id', guestController.getById);
publicRouter.delete('/api/guest/:id', guestController.destroy);
publicRouter.post(
  '/api/guest',
  fileUploadMiddlewareGuest,
  guestController.post
);
publicRouter.put(
  '/api/guest/:id',
  fileUploadMiddlewareGuest,
  guestController.update
);

publicRouter.get('/api/gallery', galleryController.get);
publicRouter.get('/api/gallery/:id', galleryController.getById);
publicRouter.delete('/api/gallery/:id', galleryController.destroy);
publicRouter.post(
  '/api/gallery',
  fileUploadMiddlewareGallery,
  galleryController.post
);
publicRouter.put(
  '/api/gallery/:id',
  fileUploadMiddlewareGallery,
  galleryController.update
);

publicRouter.get('/api/room', roomController.get);
publicRouter.get('/api/room/:id', roomController.getById);
publicRouter.delete('/api/room/:id', roomController.destroy);
//* ROOM ROUTER
publicRouter.post(
  '/api/room',
  fileUploadMiddlewareRoom,
  roomController.post
);
publicRouter.put(
  '/api/room/:id',
  fileUploadMiddlewareRoom,
  roomController.update
);

publicRouter.get('/api/booking', bookingController.get);
publicRouter.get('/api/booking/:id', bookingController.getById);
publicRouter.post('/api/booking', bookingController.post);
publicRouter.put('/api/booking/:id', bookingController.update);
publicRouter.delete('/api/booking/:id', bookingController.destroy);

publicRouter.get('/api/activity', activityController.get);
publicRouter.get('/api/activity/:id', activityController.getById);
publicRouter.delete('/api/activity/:id', activityController.destroy);
publicRouter.post(
  '/api/activity',
  fileUploadMiddlewareActivity,
  activityController.post
);
publicRouter.put(
'/api/activity/:id',
fileUploadMiddlewareActivity,
activityController.update
);

publicRouter.get('/api/review', reviewController.get);
publicRouter.get('/api/review/:id', reviewController.getById);
publicRouter.put('/api/review/:id', reviewController.update);
publicRouter.post('/api/review', reviewController.post);
publicRouter.delete('/api/review/:id', reviewController.destroy);


publicRouter.get('/api/facility', facilityController.get);
publicRouter.get('/api/facility/:id', facilityController.getById);
publicRouter.post('/api/facility', facilityController.post);
publicRouter.put('/api/facility/:id', facilityController.update);
publicRouter.delete('/api/facility/:id', facilityController.destroy);

publicRouter.get('/api/countries', countryController.get);
publicRouter.get('/api/countries/:id', countryController.getById);

publicRouter.get('/api/count', dashboardCountController.getCounts);

// publicRouter.post("/api/pembelian", pembelianController.post);
// publicRouter.get("/api/pembelian", pembelianController.get);

export default publicRouter;
