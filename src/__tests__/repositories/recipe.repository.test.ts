jest.mock("../../prisma/client", () => ({
  __esModule: true,
  default: {
    receitas: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

import { RecipeRepository } from "../../repositories/recipe.repository";
import prismaClient from "../../prisma/client";

describe("RecipeRepository", () => {
  const repo = new RecipeRepository();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a recipe", async () => {
    jest.mocked(prismaClient.receitas.create).mockResolvedValue({
      id: 1,
      nome: "Lasagna",
    } as any);

    const result = await repo.create({
      user_id: 1,
      category_id: 2,
      name: "Lasagna",
      preparationTimeMinutes: 40,
      servings: 4,
      preparationMethod: "bake",
      ingredients: "pasta",
    });

    expect(prismaClient.receitas.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        nome: "Lasagna",
        id_usuarios: 1,
      }),
    });

    expect(result.id).toBe(1);
  });

  it("should find recipe by id", async () => {
    jest.mocked(prismaClient.receitas.findUnique).mockResolvedValue({
      id: 1,
      nome: "Lasagna",
    } as any);

    const result = await repo.findById({ id: 1 });

    expect(result?.id).toBe(1);
  });
});