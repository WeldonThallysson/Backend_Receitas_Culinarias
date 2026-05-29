import { CreateRecipesService } from "../../../../src/services/recipes/create-recipes.service";
import { RecipeRepository } from "../../../../src/repositories/recipe.repository";

jest.mock("../../../../src/repositories/recipe.repository");

describe("CreateRecipesService", () => {
  let service: CreateRecipesService;
  let repo: jest.Mocked<RecipeRepository>;

  beforeEach(() => {
    repo = new RecipeRepository() as jest.Mocked<RecipeRepository>;
    service = new CreateRecipesService(repo);
  });

  it("should create recipe successfully", async () => {
    repo.create = jest.fn();

    const result = await service.execute({
      user_id: 1,
      category_id: 1,
      name: "Pizza",
      preparationTimeMinutes: 30,
      servings: 2,
      preparationMethod: "mix",
      ingredients: "cheese",
    });

    expect(repo.create).toHaveBeenCalled();
    expect(result.message).toBe("Cadastro realizado com sucesso");
  });

  it("should throw if name is missing", async () => {
    await expect(
      service.execute({
        user_id: 1,
        category_id: 1,
        name: "",
        preparation_time_minutes: 30,
        servings: 2,
        preparation_method: "mix",
        ingredients: "cheese",
      } as any),
    ).rejects.toThrow("Nome da receita é obrigatório");
  });

  it("should throw if user_id is missing", async () => {
    await expect(
      service.execute({
        user_id: 0,
        category_id: 1,
        name: "Pizza",
      } as any),
    ).rejects.toThrow("Usuário é obrigatório");
  });

  it("should throw if category_id is missing", async () => {
    await expect(
      service.execute({
        user_id: 1,
        category_id: 0,
        name: "Pizza",
      } as any),
    ).rejects.toThrow("Categoria é obrigatória");
  });
});