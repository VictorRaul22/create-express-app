import { type UserService } from "@/services/user.service";
import { type NextFunction, type Request, type Response } from "express";
import { response } from "@/utils/response";
import { validationResult } from "express-validator";

export class UserController {
  constructor(private readonly userService: UserService) {}

  get = [
    (_req: Request, res: Response, next: NextFunction) => {
      this.userService
        .list()
        .then((data) => response.success(res, data))
        .catch((err) => {
          next(err);
        });
    },
  ];

  getById = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      response.error(res, 400, result.mapped());
      return;
    }
    const { id } = req.params;
    this.userService
      .findById(id)
      .then((data) => response.success(res, data))
      .catch((err) => {
        next(err);
      });
  };
}
