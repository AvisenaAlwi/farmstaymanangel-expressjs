import prisma from "../app/database.js";
import validation from '../validation/validation.js';
import facilityValidation from '../validation/facility-validation.js';

const get = async () => {
  const result = await prisma.facility.findMany({
  });

  return result;
};

const getById = async (id) => {
  const result = await prisma.facility.findUnique({
    where: {
      id: parseInt(id), // pastikan 'id' adalah id tamu
    },
  });

  if (!result) {
    throw new Error('Facility not found');
  }

  return result;
};

const post = async (request) => {
  const validate = await validation(facilityValidation, request);
    const result = await prisma.facility.create({
      data: {
        ...validate,
      },
    });

    return result;
};

const update = async (request, params) => {
  const validate = await validation(facilityValidation, request);
  const facility = await prisma.facility.findFirst({
    where: {
      id: params,
    },
  });

  const result = await prisma.facility.update({
    where: {
      id: facility.id,
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
    const guest = await prisma.facility.findUnique({
      where: { id: parseInt(id) },
    });

    if (!guest) {
      throw new Error('Guest not found');
    }

    // Delete the guest from the database
    const deletedGuest = await prisma.facility.delete({
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
