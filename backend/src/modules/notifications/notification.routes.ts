import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { NotificationController } from "./notification.controller";

const router = Router();

router.post("/create", authMiddleware, NotificationController.create);

export default router;
