interface Market {
  name: string; // e.g. "1X2", "OVER_UNDER"
  selections: {
    name: string; // "HOME", "DRAW", "OVER_2.5"
    odds: number;
    active: boolean;
  }[];
}

interface MatchOdds {
  matchId: number;
  markets: Market[];
}

export class OddsService {
  static createOdds(matchId: number, markets: Market[]): MatchOdds {
    if (!matchId) {
      throw new Error("Match ID required");
    }

    return {
      matchId,
      markets,
    };
  }

  static updateOdds(
    matchOdds: MatchOdds,
    marketName: string,
    selectionName: string,
    newOdds: number,
  ): MatchOdds {
    if (newOdds <= 1) {
      throw new Error("Invalid odds value");
    }

    const market = matchOdds.markets.find((m) => m.name === marketName);

    if (!market) {
      throw new Error("Market not found");
    }

    const selection = market.selections.find((s) => s.name === selectionName);

    if (!selection) {
      throw new Error("Selection not found");
    }

    selection.odds = newOdds;

    return matchOdds;
  }

  static suspendMarket(matchOdds: MatchOdds, marketName: string): MatchOdds {
    const market = matchOdds.markets.find((m) => m.name === marketName);

    if (!market) {
      throw new Error("Market not found");
    }

    market.selections.forEach((s) => (s.active = false));

    return matchOdds;
  }
}
