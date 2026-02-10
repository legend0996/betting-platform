interface Transaction {
  id: number;
  userId: number;
  type: "DEPOSIT" | "WITHDRAWAL" | "BET" | "WIN" | "BONUS" | "REFERRAL";
  amount: number;
  createdAt: Date;
}

export class TransactionService {
  static createTransaction(
    userId: number,
    type: Transaction["type"],
    amount: number,
  ): Transaction {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    return {
      id: Date.now(),
      userId,
      type,
      amount,
      createdAt: new Date(),
    };
  }
}
