import prisma from "../app/database.js";
import validation from '../validation/validation.js';
import reviewValidation from '../validation/review-validation.js';

const get = async () => {
  const result = await prisma.review.findMany({
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
  const result = await prisma.review.findUnique({
    where: {
      id: parseInt(id), // pastikan 'id' adalah id tamu
    },
  });

  if (!result) {
    throw new Error('Review not found');
  }

  return result;
};

const post = async (request) => {
  const validate = await validation(reviewValidation, request);
    const result = await prisma.review.create({
      data: {
        ...validate,
      },
    });

    return result;
};

const update = async (request, params) => {
  const validate = await validation(reviewValidation, request);
  const guest = await prisma.review.findFirst({
    where: {
      id: params,
    },
  });

  const result = await prisma.review.update({
    where: {
      id: guest.id,
    },
    data: {
      ...validate,
    },
  });
  return result;
};


const destroy = async (id) => {
  try {
    // Fetch the guest to get the image path
    const guest = await prisma.review.findUnique({
      where: { id: parseInt(id) },
    });

    if (!guest) {
      throw new Error('Guest not found');
    }

    // Delete the guest from the database
    const deletedGuest = await prisma.review.delete({
      where: { id: parseInt(id) },
    });

    return deletedGuest;
  } catch (error) {
    throw new Error('Failed to delete service: ' + error.message);
  }
};


export default {
  get,
  getById,
  post,
  update,
  destroy
};
