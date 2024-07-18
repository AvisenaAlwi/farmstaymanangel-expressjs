import multer from 'multer';
import storagefile from '../../utils/storagefile.js';

export const farmservice = (req, res, next) => {
  multer({
    storage: storagefile.farmserviceImg,
  }).single('farmserviceImg');

  next();
};

export const sapi = (req, res, next) => {
  multer({
    storage: storagefile.sapiImg,
  }).single('sapiImg');

  next();
};
