import express from 'express';
import adminMiddleware from '../middleware/auth-middleware.js';
import userController from '../controllers/user-controller.js';
import multer from 'multer';
import storagefile from '../../utils/storagefile.js';
import farmserviceController from '../controllers/farmservice-controller.js';
import guestController from '../controllers/guest-controller.js';
import facilityController from '../controllers/facility-controller.js';
const adminRouter = express.Router();

const fileUploadMiddlware = multer({
  storage: storagefile.farmserviceImg,
}).single('farmserviceImg');

const fileUploadMiddlwareGuest = multer({
  storage: storagefile.guestImg,
}).single('guestimg');

// adminRouter.use(adminMiddleware);
// adminRouter.get('/api/products', productController.get);
// adminRouter.post('/api/products', fileUploadMiddlware, productController.post);
// adminRouter.put(
//   '/api/products/:name',
//   fileUploadMiddlware,
//   productController.update
// );

// adminRouter.post("/api/categories", categoryController.post);


// adminRouter.post(
//   '/api/farmservice',
//   fileUploadMiddlware,
//   farmserviceController.post
// );


// adminRouter.post(
//   '/api/guest',
//   fileUploadMiddlwareGuest,
//   guestController.post
// );


adminRouter.post('/api/:userId/logout', userController.logout);


adminRouter.post('/api/facility', facilityController.post);

export default adminRouter;
