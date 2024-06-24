import prisma from "../../../shared/prisma";
import jwt from "jsonwebtoken";
import verifyToken from "../../utils/verifyToken";
import config from "../../config";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { object } from "zod";

const createPet = async (token: string, payload: any) => {
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

  const result = await prisma.pet.create({
    data: {
      ...payload,
    },
  });

  return result;
};

const updatePet = async (token: string, petId: string, payload: any) => {
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

  const result = await prisma.pet.update({
    where: {
      id: petId,
    },
    data: {
      ...payload,
    },
  });

  return result;
};

const getAllPets = async (queryObj: Record<string, any>) => {
  const filterFields = ["species", "breed", "age", "size", "location"];
  const searchableFields = ["species", "breed", "location"];
  const sortByFields = ["species", "breed", "size"];
  let andCondition: any = [];

  let filterObj: Record<string, any> = {};
  filterFields.forEach((field) => {
    if (queryObj[field] && field != "age") {
      filterObj[field] = {
        contains: queryObj[field],
      };
    }

    if (queryObj[field] && field == "age") {
      filterObj[field] = {
        equals: parseInt(queryObj[field]),
      };
    }
  });

  if (queryObj.searchTerm) {
    andCondition.push({
      OR: searchableFields.map((field) => {
        return {
          [field]: {
            contains: queryObj.searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (Object.keys(filterObj).length > 0) {
    andCondition.push(filterObj);
  }

  const total = await prisma.pet.count({
    where: {
      AND: andCondition,
    },
  });

  const sortByObject: Record<string, any> = {};
  sortByFields.forEach((field) => {
    if (queryObj.sortBy == field) {
      sortByObject[field] = queryObj.sortOrder;
    }
  });

  const page = parseInt(queryObj.page) || 1;
  const limit = parseInt(queryObj.limit) || 10;
  const skip = (page - 1) * limit;

  const result = await prisma.pet.findMany({
    where: {
      AND: andCondition,
    },
    skip: skip,
    take: limit,
    orderBy:
      Object.keys(sortByObject).length > 0
        ? sortByObject
        : {
            createdAt: "desc",
          },
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const deletePet = async (token: string, petId: string) => {
  let decodedData: any;
  try {
    decodedData = verifyToken(token, config.jwt_secret!);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }

  if (!decodedData) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  } else {
    const result = await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
    return result;
  }
};

export const PetService = {
  createPet,
  updatePet,
  getAllPets,
  deletePet,
};
