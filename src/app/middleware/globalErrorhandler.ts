import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import AppError from "../errors/AppError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    const statusCode = err.statusCode;
    res.status(statusCode);
    res.json({
      success: false,
      message: err.message || "Unauthorized Access",
      errorDetails: err,
    });
    return;
  }

  const statusCode = httpStatus.BAD_REQUEST;
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message || "Something Went Wrong",
    errorDetails: err,
  });
};

export default globalErrorHandler;
