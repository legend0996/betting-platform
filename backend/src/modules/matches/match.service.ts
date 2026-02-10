interface CreateMatchInput {
  sportId: number;
  categoryId: number;
  tournamentId: number;
  teamAId: number;
  teamBId: number;
  startTime: Date;
}

interface MatchResultInput {
  homeGoals: number;
  awayGoals: number;
}

export class MatchService {
  /**
   * Create match
   */
  static createMatch(input: CreateMatchInput) {
    const { sportId, categoryId, tournamentId, teamAId, teamBId, startTime } =
      input;

    if (!sportId || !categoryId || !tournamentId) {
      throw new Error("Sport, category and tournament required");
    }

    if (!teamAId || !teamBId) {
      throw new Error("Both teams are required");
    }

    if (teamAId === teamBId) {
      throw new Error("Teams cannot be the same");
    }

    return {
      id: Date.now(),
      sportId,
      categoryId,
      tournamentId,
      teamAId,
      teamBId,
      startTime,
      status: "SCHEDULED",
      createdAt: new Date(),
    };
  }

  /**
   * Set match result
   */
  static setMatchResult(matchId: number, result: MatchResultInput) {
    const { homeGoals, awayGoals } = result;

    if (homeGoals < 0 || awayGoals < 0) {
      throw new Error("Goals cannot be negative");
    }

    return {
      matchId,
      homeGoals,
      awayGoals,
      status: "FINISHED",
      finishedAt: new Date(),
    };
  }

  /**
   * Close match manually
   */
  static closeMatch(matchId: number) {
    return {
      matchId,
      status: "CLOSED",
      closedAt: new Date(),
    };
  }

  /**
   * Suspend match (important for betting)
   */
  static suspendMatch(matchId: number) {
    return {
      matchId,
      status: "SUSPENDED",
      suspendedAt: new Date(),
    };
  }
}
