import { Router } from "express";
import { OddsController } from "./odds.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/admin.middleware";

const router = Router();

router.post("/create", authMiddleware, adminOnly, OddsController.create);

router.patch("/update", authMiddleware, adminOnly, OddsController.update);

export default router;
