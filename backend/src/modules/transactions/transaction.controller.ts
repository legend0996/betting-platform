import { Request, Response } from "express";
import { TransactionService } from "./transaction.service";

export class TransactionController {
  static create(req: Request, res: Response) {
    try {
      const { userId, type, amount } = req.body;

      const transaction = TransactionService.createTransaction(
        userId,
        type,
        amount,
      );

      return res.status(201).json({
        message: "Transaction recorded",
        transaction,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
