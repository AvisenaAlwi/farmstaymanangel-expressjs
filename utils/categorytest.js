import prisma from "../src/app/database";

const destroy = async () => {
  const result = await prisma.category.deleteMany({
    where: {
      name: "vegetables",
    },
  });

  return result;
};

export { destroy };
