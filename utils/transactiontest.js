import prisma from "../src/app/database.js";

const destroy = async () => {
  const result = await prisma.cart.deleteMany({
    where: {
      OR: [{ userid: 2 }, { userid: 3 }],
    },
  });

  return result;
};

const create = async () => {
  const result = await prisma.cart.create({
    data: {
      order_number: 1,
      userid: 2,
      productid: 1,
      quantity: 2,
    },
  });

  return result;
};

const trasaction = async () => {
  const result = await prisma.cart.create({
    data: {
      order_number: 3,
      userid: 3,
      productid: 2,
      quantity: 2,
    },
  });

  return result;
};

export { destroy, create, trasaction };
