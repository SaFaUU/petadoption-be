import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendReponse";
import { Request, Response } from "express";
import { AdoptionRequestService } from "./adoptionRequest.service";
import AppError from "../../errors/AppError";

const submitAdoptionRequest = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }

    console.log(req.body);

    const result = await AdoptionRequestService.submitAdoptionRequest(
      token,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Adoption request submitted successfully",
      data: result,
    });
  }
);

const updateAdoptionRequest = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }
    const id = req.params.requestId;
    const result = await AdoptionRequestService.updateAdoptionRequest(
      token,
      id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Adoption request updated successfully",
      data: result,
    });
  }
);

const getMyAdoptionRequests = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }
    const result = await AdoptionRequestService.getMyAdoptionRequests(
      token,
      req.query
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Adoption requests retrieved successfully",
      data: result,
    });
  }
);

const getAllAdoptionRequests = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }
    const result = await AdoptionRequestService.getAllAdoptionRequests(
      token,
      req.query
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Adoption requests retrieved successfully",
      data: result,
    });
  }
);

export const AdoptionRequestController = {
  submitAdoptionRequest,
  updateAdoptionRequest,
  getMyAdoptionRequests,
  getAllAdoptionRequests,
};
