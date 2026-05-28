import { UpdateRecipesService } from "../../../services/recipes/update-recipes.service";
import { RecipeRepository } from "../../../repositories/recipe.repository";

jest.mock("../../../repositories/recipe.repository");

describe("UpdateRecipesService", () => {
  let service: UpdateRecipesService;
  let repo: jest.Mocked<RecipeRepository>;

  beforeEach(() => {
    repo = new RecipeRepository() as jest.Mocked<RecipeRepository>;
    service = new UpdateRecipesService(repo);
  });

  it("should update recipe successfully", async () => {
    repo.findById = jest.fn().mockResolvedValue({ id: 1 });
    repo.update = jest.fn();

    const result = await service.execute(1, {
      user_id: 1,
      category_id: 1,
      name: "Pizza",
      preparation_method: "mix",
      ingredients: "cheese",
      preparation_time_minutes: 30,
      servings: 2,
    });

    expect(repo.findById).toHaveBeenCalledWith({ id: 1 });
    expect(repo.update).toHaveBeenCalled();
    expect(result.message).toBe("Atualização realizada com sucesso");
  });

  it("should throw if recipe not found", async () => {
    repo.findById = jest.fn().mockResolvedValue(null);

    await expect(
      service.execute(1, {
        user_id: 1,
        category_id: 1,
      } as any),
    ).rejects.toThrow("Receita não encontrada");
  });
});