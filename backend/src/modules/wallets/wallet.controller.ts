import { Request, Response } from "express";
import { WalletService } from "./wallet.service";

export class WalletController {
  static createWallet(req: Request, res: Response) {
    const { userId } = req.body;

    const wallet = WalletService.createWallet(userId);

    return res.status(201).json({
      message: "Wallet created",
      wallet,
    });
  }

  static credit(req: Request, res: Response) {
    try {
      const { wallet, amount } = req.body;

      const updated = WalletService.credit(wallet, amount);

      return res.json({
        message: "Wallet credited",
        wallet: updated,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static debit(req: Request, res: Response) {
    try {
      const { wallet, amount } = req.body;

      const updated = WalletService.smartDebit(wallet, amount);

      return res.json({
        message: "Wallet debited",
        wallet: updated,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
