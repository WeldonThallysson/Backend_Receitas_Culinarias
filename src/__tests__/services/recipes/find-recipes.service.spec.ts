import { FindRecipesService } from "../../../services/recipes/find-recipes.service";
import { RecipeRepository } from "../../../repositories/recipe.repository";

jest.mock("../../../repositories/recipe.repository");

describe("FindRecipesService", () => {
  let service: FindRecipesService;
  let repo: jest.Mocked<RecipeRepository>;

  beforeEach(() => {
    repo = new RecipeRepository() as jest.Mocked<RecipeRepository>;
    service = new FindRecipesService(repo);
  });

  it("should return mapped recipe", async () => {
    repo.findById = jest.fn().mockResolvedValue({
      id: 1,
      nome: "Pizza",
      ingredientes: "cheese",
      modo_preparo: "mix",
      tempo_preparo_minutos: 30,
      porcoes: 2,
    });

    const result = await service.execute({ id: 1 });

    expect(repo.findById).toHaveBeenCalledWith({ id: 1 });
    expect(result).toHaveProperty("id", 1);
  });

  it("should throw if recipe not found", async () => {
    repo.findById = jest.fn().mockResolvedValue(null);

    await expect(service.execute({ id: 1 })).rejects.toThrow(
      "Receita não encontrada",
    );
  });
});