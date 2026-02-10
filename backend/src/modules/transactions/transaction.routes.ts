import { Router } from "express";
import { TransactionController } from "./transaction.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/create", authMiddleware, TransactionController.create);

export default router;
