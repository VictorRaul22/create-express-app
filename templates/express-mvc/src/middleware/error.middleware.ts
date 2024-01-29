import { AppError } from "@/error/App.error";
import { response } from "@/utils/response";
import { type Request, type NextFunction, type Response } from "express";

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return response.error(res, err.status, err.message);
  } else {
    return response.error(res);
  }
};
