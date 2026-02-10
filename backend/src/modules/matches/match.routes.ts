import { Router } from "express";
import { MatchController } from "./match.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/admin.middleware";

const router = Router();

/**
 * Create match
 */
router.post("/create", authMiddleware, adminOnly, MatchController.createMatch);

/**
 * Set match result
 */
router.post(
  "/set-result",
  authMiddleware,
  adminOnly,
  MatchController.setResult,
);

/**
 * Close match
 */
router.patch(
  "/:id/close",
  authMiddleware,
  adminOnly,
  MatchController.closeMatch,
);

/**
 * Suspend match
 */
router.patch(
  "/:id/suspend",
  authMiddleware,
  adminOnly,
  MatchController.suspendMatch,
);

export default router;
