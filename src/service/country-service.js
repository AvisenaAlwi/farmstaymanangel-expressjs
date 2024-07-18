import prisma from '../app/database.js';

const get = async () => {
  const result = await prisma.country.findMany({});

  return result;
};

const getById = async (id) => {
    const result = await prisma.country.findUnique({
      where: {
        id: parseInt(id), // pastikan 'id' adalah id tamu
      },
    });

    if (!result) {
      throw new Error('Guest not found');
    }

    return result;
  };


export default {
  get,
  getById
};
