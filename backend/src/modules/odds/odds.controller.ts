import { Request, Response } from "express";
import { OddsService } from "./odds.service";

export class OddsController {
  static create(req: Request, res: Response) {
    try {
      const { matchId, markets } = req.body;

      const odds = OddsService.createOdds(matchId, markets);

      return res.status(201).json({
        message: "Odds created",
        odds,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static update(req: Request, res: Response) {
    try {
      const { matchOdds, marketName, selectionName, newOdds } = req.body;

      const updated = OddsService.updateOdds(
        matchOdds,
        marketName,
        selectionName,
        newOdds,
      );

      return res.json({
        message: "Odds updated",
        updated,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
