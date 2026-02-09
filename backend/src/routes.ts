import { Router } from "express";
import adminRoutes from "./modules/admin/admin.routes";
import betRoutes from "./modules/bets/bet.routes";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/bets", betRoutes);

export default router;
