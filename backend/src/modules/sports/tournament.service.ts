interface CreateTournamentInput {
  categoryId: number;
  name: string;
}

export class TournamentService {
  static createTournament(input: CreateTournamentInput) {
    const { categoryId, name } = input;

    if (!categoryId || !name) {
      throw new Error("categoryId and name required");
    }

    return {
      id: Date.now(),
      categoryId,
      name,
      active: true,
      createdAt: new Date(),
    };
  }
}
