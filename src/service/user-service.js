import prisma from "../app/database.js";
import responseError from "../error/error.js";
import { registrationValidation } from "../validation/user-validations.js";
import validation from "../validation/validation.js";
import bcrypt from "bcrypt";
import authValidation from "../validation/auth-validation.js";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  const validateData = await validation(registrationValidation, request);

  const isExistUser = await prisma.user.findUnique({
    where: {
      username: validateData.username,
    },
  });

  if (isExistUser) {
    throw new responseError(400, "username already exist");
  }

  const hashPassword = await bcrypt.hash(validateData.password, 10);

  const result = await prisma.user.create({
    data: {
      ...validateData,
      password: hashPassword,
    },
    select: {
      username: true,
      name: true,
      gender: true,
      role: true,
    },
  });

  return result;
};

const login = async (request) => {
  const validate = await validation(authValidation, request);

  const isExistUser = await prisma.user.findUnique({
    where: {
      username: validate.username,
    },
  });

  if (!isExistUser) {
    throw new responseError(400, "username or password wrong");
  }
  const isValidPassword = await bcrypt.compare(
    validate.password,
    isExistUser.password
  );

  if (!isValidPassword) {
    throw new responseError(400, "username or password wrong");
  }
  const token = uuid();
  const result = await prisma.user.update({
    data: {
      token: token,
    },
    where: {
      username: isExistUser.username,
    },
    select: {
      username: true,
      name: true,
      gender: true,
      role: true,
      token: true,
    },
  });

  return result;
};

const logout = async (request) => {
  const user = await prisma.user.findUnique({
    where: {
      id: request,
    },
    select: {
      id: true,
      token: true,
    },
  });

  if (!user) {
    throw new responseError(404, "user not found");
  }

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      token: null,
    },
  });

  return result;
};

export default {
  register,
  login,
  logout,
};
