import prisma from "../src/app/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export const create = async () => {
  const hashPassword = await bcrypt.hash("password", 10);
  const result = await prisma.user.create({
    data: {
      username: "test",
      name: "test",
      gender: "Male",
      role: "Admin",
      password: hashPassword,
    },
  });

  return result;
};

export const destroy = async () => {
  const result = await prisma.user.deleteMany({
    where: {
      username: "test",
    },
  });

  return result;
};
