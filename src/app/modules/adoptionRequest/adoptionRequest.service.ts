import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/AppError";
import verifyToken from "../../utils/verifyToken";
import config from "../../config";

const submitAdoptionRequest = async (token: string, data: any) => {
  let decodedData: any;
  try {
    decodedData = verifyToken(token, config.jwt_secret!);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }

  if (!decodedData) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }

  const id = decodedData.id;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
  });

  const result = await prisma.adoptionRequest.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  return result;
};

const updateAdoptionRequest = async (token: string, id: string, data: any) => {
  console.log(id);
  let decodedData: any;
  try {
    decodedData = verifyToken(token, config.jwt_secret!);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }

  if (!decodedData) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }

  const userId = decodedData.id;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const result = await prisma.adoptionRequest.update({
    where: {
      id: id,
    },
    data: {
      ...data,
    },
  });

  return result;
};

const getAdoptionRequests = async (token: string) => {
  let decodedData: any;
  try {
    decodedData = verifyToken(token, config.jwt_secret!);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }

  if (!decodedData) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }

  const userId = decodedData.id;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const result = await prisma.adoptionRequest.findMany({
    where: {
      userId: user.id,
    },
  });

  return result;
};

export const AdoptionRequestService = {
  submitAdoptionRequest,
  updateAdoptionRequest,
  getAdoptionRequests,
};
