import { Router } from "express";
import adminRoutes from "./modules/admin/admin.routes";
import betRoutes from "./modules/bets/bet.routes";
import bonusRoutes from "./modules/bonuses/bonus.routes";
import matchRoutes from "./modules/matches/match.routes";
import referralRoutes from "./modules/referrals/referral.routes";
import transactionRoutes from "./modules/transactions/transaction.routes";
import oddsRoutes from "./modules/odds/odds.routes";
import notificationRoutes from "./modules/notifications/notification.routes";
import authRoutes from "./modules/auth/auth.routes";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/bets", betRoutes);
router.use("/bonuses", bonusRoutes);
router.use("/matches", matchRoutes);
router.use("/referrals", referralRoutes);
router.use("/transactions", transactionRoutes);
router.use("/odds", oddsRoutes);
router.use("/notifications", notificationRoutes);
router.use("/auth", authRoutes);
export default router;
