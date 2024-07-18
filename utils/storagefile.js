import multer from 'multer';
import path from 'path';

const createDiskStorage = (destinationPath) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
};

const farmserviceImg = createDiskStorage('./src/assets/farmservice');
const guestImg       = createDiskStorage('./src/assets/guest');
const roomImg        = createDiskStorage('./src/assets/room');
const galleryImg     = createDiskStorage('./src/assets/gallery');
const activityImg    = createDiskStorage('./src/assets/activity');

export default {
  farmserviceImg,
  guestImg,
  roomImg,
  galleryImg,
  activityImg
};
