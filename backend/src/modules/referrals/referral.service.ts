import { generateReference } from "../../utils/helpers";

interface ReferralLinkInput {
  referrerId: number;
  referredUserId: number;
}

export class ReferralService {
  /**
   * Generate referral code for a user
   */
  static generateReferralCode(userId: number) {
    return `REF_${userId}_${generateReference("CODE")}`;
  }

  /**
   * Link referred user to referrer
   */
  static linkReferral(input: ReferralLinkInput) {
    const { referrerId, referredUserId } = input;

    if (referrerId === referredUserId) {
      throw new Error("User cannot refer themselves");
    }

    return {
      referrerId,
      referredUserId,
      linkedAt: new Date(),
    };
  }

  /**
   * Calculate referral reward
   * Example: 5% of bet amount
   */
  static calculateReferralReward(betAmount: number, percentage = 5) {
    const reward = (betAmount * percentage) / 100;

    return {
      reward,
      percentage,
    };
  }

  /**
   * Multi-level commission
   * Level 1 → 5%
   * Level 2 → 2%
   */
  static calculateMultiLevelReward(betAmount: number) {
    return {
      level1: (betAmount * 5) / 100,
      level2: (betAmount * 2) / 100,
    };
  }
}
