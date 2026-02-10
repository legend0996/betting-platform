import { Request, Response } from "express";
import { MatchService } from "./match.service";

export class MatchController {
  /**
   * Create match
   */
  static createMatch(req: Request, res: Response) {
    try {
      const match = MatchService.createMatch(req.body);

      return res.status(201).json({
        message: "Match created successfully",
        match,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  /**
   * Set match result
   */
  static setResult(req: Request, res: Response) {
    try {
      const { matchId, homeGoals, awayGoals } = req.body;

      const result = MatchService.setMatchResult(matchId, {
        homeGoals,
        awayGoals,
      });

      return res.json({
        message: "Match result set successfully",
        result,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  /**
   * Close match
   */
  static closeMatch(req: Request, res: Response) {
    try {
      const matchId = Number(req.params.id);

      const closed = MatchService.closeMatch(matchId);

      return res.json({
        message: "Match closed successfully",
        closed,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  /**
   * Suspend match (important for betting control)
   */
  static suspendMatch(req: Request, res: Response) {
    try {
      const matchId = Number(req.params.id);

      const suspended = MatchService.suspendMatch(matchId);

      return res.json({
        message: "Match suspended successfully",
        suspended,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
