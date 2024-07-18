import prisma from "../app/database.js";
import validation from '../validation/validation.js';
import galleryValidation from '../validation/gallery-validation.js';
import responseError from '../error/error.js';
import path from 'path';
import fs from 'fs/promises';

const get = async () => {
  const result = await prisma.gallery.findMany({
    include: {
      guest: {
        include: {
          country: true,
        },
      },
    },
  });

  return result;
};

const getById = async (id) => {
  const result = await prisma.gallery.findUnique({
    where: {
      id: parseInt(id), // pastikan 'id' adalah id tamu
    },
  });

  if (!result) {
    throw new Error('Image Gallery not found');
  }

  return result;
};
const post = async (request, galleryimg) => {
  const validate = await validation(galleryValidation, request);
  const gallery = await prisma.gallery.findFirst({
    where: {
      title: validate.title,
    },
  });

  if (gallery) {
    throw new responseError(400, 'duplicate name entry');
  }
  // if (!image) {
  //   throw new responseError(400, "image is required");
  // }
  const extension = path.extname(galleryimg.filename);
  if (extension === '.png' || extension === '.jpg') {
    const result = await prisma.gallery.create({
      data: {
        image: galleryimg.filename,
        ...validate,
      },
    });

    return result;
  } else {
    throw new responseError(400, 'extension image must be png or jpg');
  }
};

const update = async (request, galleryimg, params) => {
  const validate = await validation(galleryValidation, request);
  const gallery = await prisma.gallery.findFirst({
    where: {
      id: params,
    },
  });

  if (!gallery) {
    throw new responseError(404, 'gallery not found');
  }

  if (!galleryimg) {
    const result = await prisma.gallery.update({
      where: {
        id: gallery.id,
      },
      data: {
        ...validate,
      },
    });
    return result;
  }

  fs.unlink('./src/assets/gallery/' + gallery.image);
  const result = await prisma.gallery.update({
    where: {
      id: gallery.id,
    },
    data: {
      image: galleryimg.filename,
      ...validate,
    },
  });
  return result;
};

const destroy = async (id) => {
  try {
    // Fetch the guest to get the image path
    const guest = await prisma.gallery.findUnique({
      where: { id: parseInt(id) },
    });

    if (!guest) {
      throw new Error('Guest not found');
    }

    // Define the path to the image
    const imagePath = path.join(process.cwd(), 'src', 'assets', 'gallery', guest.image);
    // Check if the image exists and delete it
    try {
      await fs.access(imagePath);
      await fs.unlink(imagePath);
    } catch (err) {
      console.warn(`Image not found at path: ${imagePath}`);
    }

    // Delete the guest from the database
    const deletedGuest = await prisma.gallery.delete({
      where: { id: parseInt(id) },
    });

    return deletedGuest;
  } catch (error) {
    throw new Error('Failed to delete guest: ' + error.message);
  }
};


export default {
  get,
  getById,
  post,
  update,
  destroy
};
