interface CreateCategoryInput {
  sportId: number;
  name: string;
}

export class CategoryService {
  static createCategory(input: CreateCategoryInput) {
    const { sportId, name } = input;

    if (!sportId || !name) {
      throw new Error("sportId and name required");
    }

    return {
      id: Date.now(),
      sportId,
      name,
      active: true,
      createdAt: new Date(),
    };
  }
}
