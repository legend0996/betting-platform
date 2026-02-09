import { calculatePotentialWin, roundAmount } from "../../utils/helpers";

interface BetSelection {
  matchId: number;
  market: string;
  selection: string;
  odds: number;
}

interface CreateBetInput {
  stake: number;
  selections: BetSelection[];
}

interface BetValidationResult {
  totalOdds: number;
  potentialWin: number;
}

export class BetService {
  /**
   * Main bet creation logic (no DB)
   */
  static createBet(input: CreateBetInput) {
    const { stake, selections } = input;

    this.validateStake(stake);
    this.validateSelections(selections);

    const totalOdds = this.calculateTotalOdds(selections);
    const potentialWin = calculatePotentialWin(stake, totalOdds);

    return {
      stake,
      selections,
      totalOdds,
      potentialWin,
      type: selections.length > 1 ? "ACCUMULATOR" : "SINGLE",
      status: "PENDING",
      createdAt: new Date(),
    };
  }

  /**
   * Ensure stake is valid
   */
  private static validateStake(stake: number) {
    if (!stake || stake <= 0) {
      throw new Error("Stake must be greater than 0");
    }

    if (stake < 10) {
      throw new Error("Minimum stake is 10");
    }
  }

  /**
   * Ensure selections are valid
   */
  private static validateSelections(selections: BetSelection[]) {
    if (!selections || selections.length === 0) {
      throw new Error("At least one selection is required");
    }

    const matchIds = new Set<number>();

    for (const selection of selections) {
      if (!selection.matchId) {
        throw new Error("Invalid match ID");
      }

      if (selection.odds <= 1) {
        throw new Error("Invalid odds value");
      }

      // 🚨 VERY IMPORTANT RULE
      // One selection per match
      if (matchIds.has(selection.matchId)) {
        throw new Error("Only one selection allowed per match");
      }

      matchIds.add(selection.matchId);
    }
  }

  /**
   * Multiply odds for accumulator
   */
  private static calculateTotalOdds(selections: BetSelection[]): number {
    const total = selections.reduce(
      (acc, selection) => acc * selection.odds,
      1,
    );

    return roundAmount(total);
  }
}
