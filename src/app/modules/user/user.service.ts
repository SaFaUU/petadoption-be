import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import generateToken from "../../utils/generateToken";
import verifyToken from "../../utils/verifyToken";

const registerIntoDB = async (payload: any) => {
  const salt = await bcrypt.genSalt(parseInt(config.salt_rounds!));
  const hashedPassword: string = await bcrypt.hash(payload.password, salt);

  const result = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const loginUser = async (payload: any) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email as string,
    },
  });

  const isValidPassword = await bcrypt.compare(
    payload.password,
    result.password
  );
  if (!isValidPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  const token = generateToken({
    id: result.id,
    name: result.name,
    email: result.email,
  });

  return {
    id: result.id,
    name: result.name,
    email: result.email,
    token: token,
  };
};

const getProfile = async (token: string) => {
  let decodedData: any;
  try {
    decodedData = verifyToken(token, config.jwt_secret!);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: decodedData.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const updateProfile = async (token: string, payload: any) => {
  let decodedData: any;
  try {
    decodedData = verifyToken(token, config.jwt_secret!);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  const result = await prisma.user.update({
    where: {
      id: decodedData.id,
    },
    data: {
      ...payload,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

export const UserService = {
  registerIntoDB,
  loginUser,
  getProfile,
  updateProfile,
};