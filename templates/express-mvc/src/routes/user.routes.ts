import { UserController } from "@/controller/user.controller";
import { validateGetUserById } from "@/request/user.validate";
import { UserService } from "@/services/user.service";
import express, { type Router } from "express";
const router: Router = express.Router();

const userService = new UserService();
const userController = new UserController(userService);

router.get("/", userController.get);
router.get("/:id", validateGetUserById(), userController.getById);

export { router as userRouter };
