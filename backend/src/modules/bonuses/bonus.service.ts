interface Bonus {
  id: number;
  type: "WELCOME" | "FREE_BET" | "DEPOSIT_MATCH";
  amount: number;
  minStake?: number;
  expiryDate?: Date;
  active: boolean;
}

interface ApplyBonusInput {
  stake: number;
  bonus: Bonus;
}

export class BonusService {
  /**
   * Validate bonus before applying
   */
  static validateBonus(bonus: Bonus) {
    if (!bonus.active) {
      throw new Error("Bonus is not active");
    }

    if (bonus.expiryDate && bonus.expiryDate < new Date()) {
      throw new Error("Bonus expired");
    }
  }

  /**
   * Apply bonus to stake
   */
  static applyBonus(input: ApplyBonusInput) {
    const { stake, bonus } = input;

    this.validateBonus(bonus);

    if (bonus.minStake && stake < bonus.minStake) {
      throw new Error(`Minimum stake for this bonus is ${bonus.minStake}`);
    }

    switch (bonus.type) {
      case "WELCOME":
      case "DEPOSIT_MATCH":
        return {
          newStake: stake + bonus.amount,
          bonusAmount: bonus.amount,
        };

      case "FREE_BET":
        return {
          newStake: bonus.amount,
          bonusAmount: bonus.amount,
        };

      default:
        throw new Error("Unsupported bonus type");
    }
  }

  /**
   * Calculate wagering requirement
   */
  static calculateWagerRequirement(bonusAmount: number, multiplier: number) {
    return bonusAmount * multiplier;
  }
}
