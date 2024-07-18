import prisma from "../src/app/database.js";

const create = async () => {
  const result = await prisma.product.create({
    data: {
      image: "productImg-894343942984.jpg",
      name: "mangga",
      stock: 10,
      price: 10000,
      category_id: 1,
    },
  });

  return result;
};

const destroy = async (name) => {
  const result = await prisma.product.deleteMany({
    where: {
      name: name,
    },
  });

  return result;
};

export { create, destroy };
