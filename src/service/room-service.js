import prisma from '../app/database.js';
import validation from '../validation/validation.js';
import responseError from '../error/error.js';
import roomValidation from '../validation/room-validation.js';
import path from 'path';
import fs from 'fs/promises';

const get = async () => {
  const result = await prisma.room.findMany({
    // include: {
    //   country: true, // Mengambil semua bidang dari tabel Country yang terhubung
    // },
  });

  return result;
};

const getById = async (id) => {
  const result = await prisma.room.findUnique({
    where: {
      id: parseInt(id), // pastikan 'id' adalah id tamu
    },
  });

  if (!result) {
    throw new Error('Guest not found');
  }

  return result;
};

const post = async (request, roomimg) => {
  const validate = await validation(roomValidation, request);
  const room = await prisma.room.findFirst({
    where: {
      name: validate.name,
    },
  });

  if (room) {
    throw new responseError(400, 'duplicate name entry');
  }
  // if (!image) {
  //   throw new responseError(400, "image is required");
  // }
  const extension = path.extname(roomimg.filename);
  if (extension === '.png' || extension === '.jpg') {
    const result = await prisma.room.create({
      data: {
        image: roomimg.filename,
        ...validate,
      },
    });

    return result;
  } else {
    throw new responseError(400, 'extension image must be png or jpg');
  }
};

const update = async (request, roomimg, params) => {
  const validate = await validation(roomValidation, request);
  const room = await prisma.room.findFirst({
    where: {
      id: params,
    },
  });

  if (!room) {
    throw new responseError(404, 'room not found');
  }

  if (!roomimg) {
    const result = await prisma.room.update({
      where: {
        id: room.id,
      },
      data: {
        ...validate,
      },
    });
    return result;
  }

  fs.unlink('./src/assets/room/' + room.image);
  const result = await prisma.room.update({
    where: {
      id: room.id,
    },
    data: {
      image: roomimg.filename,
      ...validate,
    },
  });
  return result;
};

const destroy = async (id) => {
  try {
    // Fetch the guest to get the image path
    const guest = await prisma.room.findUnique({
      where: { id: parseInt(id) },
    });

    if (!guest) {
      throw new Error('Guest not found');
    }

    // Define the path to the image
    const imagePath = path.join(process.cwd(), 'src', 'assets', 'room', guest.image);
    // Check if the image exists and delete it
    try {
      await fs.access(imagePath);
      await fs.unlink(imagePath);
    } catch (err) {
      console.warn(`Image not found at path: ${imagePath}`);
    }

    // Delete the guest from the database
    const deletedGuest = await prisma.room.delete({
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
