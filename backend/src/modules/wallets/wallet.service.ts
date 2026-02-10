interface Wallet {
  userId: number;
  balance: number;
  bonusBalance: number;
}

export class WalletService {
  /**
   * Create wallet for user
   */
  static createWallet(userId: number): Wallet {
    return {
      userId,
      balance: 0,
      bonusBalance: 0,
    };
  }

  /**
   * Credit main wallet
   */
  static credit(wallet: Wallet, amount: number): Wallet {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    wallet.balance += amount;

    return wallet;
  }

  /**
   * Debit main wallet
   */
  static debit(wallet: Wallet, amount: number): Wallet {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    if (wallet.balance < amount) {
      throw new Error("Insufficient balance");
    }

    wallet.balance -= amount;

    return wallet;
  }

  /**
   * Credit bonus wallet
   */
  static creditBonus(wallet: Wallet, amount: number): Wallet {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    wallet.bonusBalance += amount;

    return wallet;
  }

  /**
   * Deduct bonus first then main balance
   */
  static smartDebit(wallet: Wallet, amount: number): Wallet {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    let remaining = amount;

    if (wallet.bonusBalance >= remaining) {
      wallet.bonusBalance -= remaining;
      return wallet;
    }

    remaining -= wallet.bonusBalance;
    wallet.bonusBalance = 0;

    if (wallet.balance < remaining) {
      throw new Error("Insufficient total balance");
    }

    wallet.balance -= remaining;

    return wallet;
  }
}
