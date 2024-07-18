import prisma from '../app/database.js';
import validation from '../validation/validation.js';
import responseError from '../error/error.js';
import ActivityValidation from '../validation/activity-validation.js';
import path from 'path';
import fs from 'fs/promises';

const get = async () => {
  const result = await prisma.activity.findMany({
    include: {
      guest: true,
    },
  });

  return result;
};

const getById = async (id) => {
  const result = await prisma.activity.findUnique({
    where: {
      id: parseInt(id), // pastikan 'id' adalah id tamu
    },
    include: {
      guest: true,
    },
  });

  if (!result) {
    throw new Error('Guest not found');
  }

  return result;
};

const post = async (request, activityimg) => {
  const validate = await validation(ActivityValidation, request);
  const activity = await prisma.activity.findFirst({
    where: {
      title: validate.title,
    },
  });

  if (activity) {
    throw new responseError(400, 'duplicate Title entry');
  }
  // if (!image) {
  //   throw new responseError(400, "image is required");
  // }
  const extension = path.extname(activityimg.filename);
  if (extension === '.png' || extension === '.jpg') {
    const result = await prisma.activity.create({
      data: {
        image: activityimg.filename,
        ...validate,
      },
    });

    return result;
  } else {
    throw new responseError(400, 'extension image must be png or jpg');
  }
};

const update = async (request, activityimg, params) => {
  const validate = await validation(ActivityValidation, request);
  const activity = await prisma.activity.findFirst({
    where: {
      id: params,
    },
  });

  if (!activity) {
    throw new responseError(404, 'activity not found');
  }

  if (!activityimg) {
    const result = await prisma.activity.update({
      where: {
        id: activity.id,
      },
      data: {
        ...validate,
      },
    });
    return result;
  }

  fs.unlink('./src/assets/activity/' + activity.image);
  const result = await prisma.activity.update({
    where: {
      id: activity.id,
    },
    data: {
      image: activityimg.filename,
      ...validate,
    },
  });
  return result;
};

const destroy = async (id) => {
  try {
    // Fetch the guest to get the image path
    const guest = await prisma.activity.findUnique({
      where: { id: parseInt(id) },
    });

    if (!guest) {
      throw new Error('Activity not found');
    }

    // Define the path to the image
    const imagePath = path.join(process.cwd(), 'src', 'assets', 'activity', guest.image);
    // Check if the image exists and delete it
    try {
      await fs.access(imagePath);
      await fs.unlink(imagePath);
    } catch (err) {
      console.warn(`Image not found at path: ${imagePath}`);
    }

    // Delete the guest from the database
    const deletedGuest = await prisma.activity.delete({
      where: { id: parseInt(id) },
    });

    return deletedGuest;
  } catch (error) {
    throw new Error('Failed to delete activity: ' + error.message);
  }
};

export default {
  get,
  post,
  getById,
  update,
  destroy
};
