import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router();

// TEMP: open route (later protected)
router.post("/create", AdminController.createAdmin);

export default router;
