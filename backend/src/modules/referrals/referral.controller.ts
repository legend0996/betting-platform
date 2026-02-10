import { Request, Response } from "express";
import { ReferralService } from "./referral.service";

export class ReferralController {
  static generateCode(req: Request, res: Response) {
    const userId = Number(req.params.userId);

    const code = ReferralService.generateReferralCode(userId);

    return res.json({
      message: "Referral code generated",
      code,
    });
  }

  static linkReferral(req: Request, res: Response) {
    try {
      const result = ReferralService.linkReferral(req.body);

      return res.json({
        message: "Referral linked",
        result,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static calculateReward(req: Request, res: Response) {
    const { betAmount } = req.body;

    const reward = ReferralService.calculateReferralReward(betAmount);

    return res.json({
      reward,
    });
  }
}
