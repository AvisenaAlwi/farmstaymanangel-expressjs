import prisma from '../app/database.js';
import validation from '../validation/validation.js';
import responseError from '../error/error.js';
import GuestValidation from '../validation/guest-validation.js';
import path from 'path';
import fs from 'fs/promises';

const get = async () => {
  const result = await prisma.guest.findMany({
    include: {
      country: true,
      Review: true, // Mengambil semua bidang dari tabel Country yang terhubung
    },
  });

  return result;
};

const getById = async (id) => {
  const result = await prisma.guest.findUnique({
    where: {
      id: parseInt(id), // pastikan 'id' adalah id tamu
    },
    include: {
      country: true,
      Review: true, // Mengambil semua bidang dari tabel Country yang terhubung
    },
  });

  if (!result) {
    throw new Error('Guest not found');
  }

  return result;
};

const post = async (request, guestimg) => {
  const validate = await validation(GuestValidation, request);
  const guest = await prisma.guest.findFirst({
    where: {
      name: validate.name,
    },
  });

  if (guest) {
    throw new responseError(400, 'duplicate name entry');
  }
  // if (!image) {
  //   throw new responseError(400, "image is required");
  // }
  const extension = path.extname(guestimg.filename);
  if (extension === '.png' || extension === '.jpg') {
    const result = await prisma.guest.create({
      data: {
        image: guestimg.filename,
        ...validate,
      },
    });

    return result;
  } else {
    throw new responseError(400, 'extension image must be png or jpg');
  }
};

const update = async (request, guestimg, params) => {
  const validate = await validation(GuestValidation, request);
  const guest = await prisma.guest.findFirst({
    where: {
      id: params,
    },
  });

  if (!guest) {
    throw new responseError(404, 'guest not found');
  }

  if (!guestimg) {
    const result = await prisma.guest.update({
      where: {
        id: guest.id,
      },
      data: {
        ...validate,
      },
    });
    return result;
  }

  fs.unlink('./src/assets/guest/' + guest.image);
  const result = await prisma.guest.update({
    where: {
      id: guest.id,
    },
    data: {
      image: guestimg.filename,
      ...validate,
    },
  });
  return result;
};

const destroy = async (id) => {
  try {
    // Fetch the guest to get the image path
    const guest = await prisma.guest.findUnique({
      where: { id: parseInt(id) },
    });

    if (!guest) {
      throw new Error('Guest not found');
    }

    // Define the path to the image
    const imagePath = path.join(process.cwd(), 'src', 'assets', 'guest', guest.image);
    // Check if the image exists and delete it
    try {
      await fs.access(imagePath);
      await fs.unlink(imagePath);
    } catch (err) {
      console.warn(`Image not found at path: ${imagePath}`);
    }

    // Delete the guest from the database
    const deletedGuest = await prisma.guest.delete({
      where: { id: parseInt(id) },
    });

    return deletedGuest;
  } catch (error) {
    throw new Error('Failed to delete guest: ' + error.message);
  }
};



export default {
  get,
  post,
  getById,
  update,
  destroy
};
