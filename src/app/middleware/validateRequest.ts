import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message:
          (
            "" +
            err.issues.map((issue: any) => {
              return issue.message;
            })
          ).replace(/,/g, ". ") + "",
        errorDetails: {
          issues: err.errors.map((err: any) => ({
            field: err.path[1],
            message: err.message,
          })),
        },
      });
    }
  };

export default validateRequest;
