interface MatchResult {
  homeGoals: number;
  awayGoals: number;
}

interface BetSelection {
  matchId: number;
  market: string;
  selection: string;
  odds: number;
}

type SelectionResult = "WIN" | "LOSE";

export class SettlementService {
  /**
   * Evaluate a single selection
   */
  static evaluateSelection(
    selection: BetSelection,
    result: MatchResult,
  ): SelectionResult {
    const { homeGoals, awayGoals } = result;
    const totalGoals = homeGoals + awayGoals;

    switch (selection.selection) {
      // 1X2 MARKET
      case "HOME":
        return homeGoals > awayGoals ? "WIN" : "LOSE";

      case "DRAW":
        return homeGoals === awayGoals ? "WIN" : "LOSE";

      case "AWAY":
        return awayGoals > homeGoals ? "WIN" : "LOSE";

      // OVER / UNDER
      case "OVER_0.5":
        return totalGoals > 0.5 ? "WIN" : "LOSE";

      case "OVER_1.5":
        return totalGoals > 1.5 ? "WIN" : "LOSE";

      case "OVER_2.5":
        return totalGoals > 2.5 ? "WIN" : "LOSE";

      case "UNDER_2.5":
        return totalGoals < 2.5 ? "WIN" : "LOSE";

      case "UNDER_3.5":
        return totalGoals < 3.5 ? "WIN" : "LOSE";

      // BOTH TEAMS TO SCORE (GG)
      case "GG_YES":
        return homeGoals > 0 && awayGoals > 0 ? "WIN" : "LOSE";

      case "GG_NO":
        return homeGoals === 0 || awayGoals === 0 ? "WIN" : "LOSE";

      // COMBO MARKETS
      case "HOME_AND_OVER_2.5":
        return homeGoals > awayGoals && totalGoals > 2.5 ? "WIN" : "LOSE";

      case "DRAW_AND_UNDER_3.5":
        return homeGoals === awayGoals && totalGoals < 3.5 ? "WIN" : "LOSE";

      case "GG_YES_AND_OVER_2.5":
        return homeGoals > 0 && awayGoals > 0 && totalGoals > 2.5
          ? "WIN"
          : "LOSE";

      default:
        throw new Error(`Unsupported selection type: ${selection.selection}`);
    }
  }

  /**
   * Evaluate full bet (single or accumulator)
   */
  static settleBet(
    selections: BetSelection[],
    results: Record<number, MatchResult>,
  ) {
    const evaluationResults = selections.map((selection) => {
      const matchResult = results[selection.matchId];

      if (!matchResult) {
        throw new Error(`Missing result for match ${selection.matchId}`);
      }

      const result = this.evaluateSelection(selection, matchResult);

      return {
        matchId: selection.matchId,
        selection: selection.selection,
        result,
      };
    });

    const hasLoss = evaluationResults.some((r) => r.result === "LOSE");

    return {
      status: hasLoss ? "LOSE" : "WIN",
      selections: evaluationResults,
      settledAt: new Date(),
    };
  }
}
