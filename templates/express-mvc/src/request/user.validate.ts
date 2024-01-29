import { param } from "express-validator";
export const validateGetUserById = () => {
  return [param("id").isNumeric()];
};
