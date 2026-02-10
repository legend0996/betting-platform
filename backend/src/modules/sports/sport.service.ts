interface CreateSportInput {
  name: string;
}

export class SportService {
  static createSport(input: CreateSportInput) {
    if (!input.name) {
      throw new Error("Sport name is required");
    }

    return {
      id: Date.now(),
      name: input.name,
      active: true,
      createdAt: new Date(),
    };
  }
}
