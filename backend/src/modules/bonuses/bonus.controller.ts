import { Request, Response } from "express";
import { BonusService } from "./bonus.service";

export class BonusController {
  static applyBonus(req: Request, res: Response) {
    try {
      const { stake, bonus } = req.body;

      const result = BonusService.applyBonus({
        stake,
        bonus,
      });

      return res.json({
        message: "Bonus applied",
        result,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
