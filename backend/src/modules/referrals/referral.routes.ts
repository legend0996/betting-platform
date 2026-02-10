import { Router } from "express";
import { ReferralController } from "./referral.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.get(
  "/generate/:userId",
  authMiddleware,
  ReferralController.generateCode,
);

router.post("/link", authMiddleware, ReferralController.linkReferral);

router.post("/calculate", authMiddleware, ReferralController.calculateReward);

export default router;
