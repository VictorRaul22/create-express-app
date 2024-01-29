import { type Response } from "express";

const success = (res: Response, data?: unknown, statusCode?: number) => {
  return res.status(statusCode ?? 200).json(data ?? null);
};
const error = (res: Response, statusCode?: number, data?: unknown) => {
  const newData = data ?? { message: "Internal Server Error" };
  return res.status(statusCode ?? 500).json(newData);
};
export const response = {
  success,
  error,
};
