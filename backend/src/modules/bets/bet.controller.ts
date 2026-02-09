import { Request, Response } from "express";
import { BetService } from "./bet.service";
import { SettlementService } from "./settlement.service";

export class BetController {
  /**
   * Create bet (no DB)
   */
  static createBet(req: Request, res: Response) {
    try {
      const betData = req.body;

      const bet = BetService.createBet(betData);

      return res.status(201).json({
        message: "Bet created successfully",
        bet,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  /**
   * Settle bet manually (for testing logic only)
   * Admin would normally trigger this
   */
  static settleBet(req: Request, res: Response) {
    try {
      const { selections, results } = req.body;

      const settlement = SettlementService.settleBet(selections, results);

      return res.json({
        message: "Bet settled",
        settlement,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
