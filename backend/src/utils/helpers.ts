import crypto from "crypto";

/**
 * Generate a random reference ID
 * Used for transactions, bets, payouts
 */
export function generateReference(prefix: string): string {
  const random = crypto.randomBytes(6).toString("hex");
  return `${prefix}_${Date.now()}_${random}`;
}

/**
 * Round numbers safely for money
 */
export function roundAmount(amount: number, decimals = 2): number {
  return Number(amount.toFixed(decimals));
}

/**
 * Calculate potential win
 */
export function calculatePotentialWin(stake: number, odds: number): number {
  return roundAmount(stake * odds);
}

/**
 * Check if value is positive number
 */
export function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && value > 0;
}
