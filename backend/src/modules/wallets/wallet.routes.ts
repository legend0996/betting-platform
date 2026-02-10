import { Router } from "express";
import { WalletController } from "./wallet.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/create", authMiddleware, WalletController.createWallet);

router.post("/credit", authMiddleware, WalletController.credit);

router.post("/debit", authMiddleware, WalletController.debit);

export default router;
