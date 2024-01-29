import { Router } from "express";
import { userRouter } from "./user.routes";
export function routeApp(app: Router) {
  const router = Router();
  app.use("/api/v1", router);
  router.use("/user", userRouter);
}
