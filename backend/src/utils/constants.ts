export const USER_STATUS = {
  ACTIVE: "active",
  BLOCKED: "blocked",
} as const;

export const BET_STATUS = {
  PENDING: "pending",
  WON: "won",
  LOST: "lost",
  VOID: "void",
} as const;

export const MATCH_STATUS = {
  SCHEDULED: "scheduled",
  LIVE: "live",
  CLOSED: "closed",
} as const;

export const WALLET_TRANSACTION_TYPE = {
  DEPOSIT: "deposit",
  WITHDRAWAL: "withdrawal",
  BET: "bet",
  WIN: "win",
  BONUS: "bonus",
  COMMISSION: "commission",
} as const;

export const DEFAULT_CURRENCY = "KES";
