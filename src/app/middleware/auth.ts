import { NextFunction, Request, Response } from "express";
import config from "../config";
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { jwtHelpers } from "../helpers/jwtHelpers";

const auth = (...roles: string[]) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token as string,
        config.jwt_secret!
      );

      req.user = verifiedUser as any;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new AppError(httpStatus.FORBIDDEN, "Forbidden!");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
