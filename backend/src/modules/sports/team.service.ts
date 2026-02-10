interface CreateTeamInput {
  tournamentId: number;
  name: string;
}

export class TeamService {
  static createTeam(input: CreateTeamInput) {
    const { tournamentId, name } = input;

    if (!tournamentId || !name) {
      throw new Error("tournamentId and name required");
    }

    return {
      id: Date.now(),
      tournamentId,
      name,
      active: true,
      createdAt: new Date(),
    };
  }
}
