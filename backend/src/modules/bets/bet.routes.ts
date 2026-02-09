import { Router } from "express";
import { BetController } from "./bet.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { rateLimiter } from "../../middlewares/rateLimiter";

const router = Router();

/**
 * Create bet
 * Protected route (requires JWT)
 */
router.post("/create", rateLimiter, authMiddleware, BetController.createBet);

/**
 * Settle bet
 * Normally admin-only (logic only for now)
 */
router.post("/settle", rateLimiter, BetController.settleBet);

export default router;
