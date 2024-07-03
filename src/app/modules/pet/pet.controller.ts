import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendReponse";
import httpStatus from "http-status";
import { PetService } from "./pet.service";
import AppError from "../../errors/AppError";

const createPet = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  const result = await PetService.createPet(token, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Pet added successfully",
    data: result,
  });
});

const updatePet = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { petId } = req.params;

  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  const result = await PetService.updatePet(token, petId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Pet profile updated successfully",
    data: result,
  });
});

const getAllPets = catchAsync(async (req: Request, res: Response) => {
  const newQuery: Record<string, any> = {};

  for (const [key, value] of Object.entries(req.query)) {
    if (value !== "") {
      newQuery[key] = value;
    }
  }

  const result = await PetService.getAllPets(newQuery);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Pets retrieved successfully",
    data: result,
  });
});

const getSinglePet = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { petId } = req.params;
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  const result = await PetService.getSinglePet(token, petId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Pet retrieved successfully",
    data: result,
  });
});

const deletePet = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { petId } = req.params;
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  const result = await PetService.deletePet(token, petId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Pet deleted successfully",
    data: result,
  });
});

export const PetController = {
  createPet,
  updatePet,
  getAllPets,
  deletePet,
  getSinglePet,
};
