import { DeleteRecipesService } from "../../../../src/services/recipes/delete-recipes.service";
import { RecipeRepository } from "../../../../src/repositories/recipe.repository";

jest.mock("../../../../src/repositories/recipe.repository");

describe("DeleteRecipesService", () => {
  let service: DeleteRecipesService;
  let repo: jest.Mocked<RecipeRepository>;

  beforeEach(() => {
    repo = new RecipeRepository() as jest.Mocked<RecipeRepository>;
    service = new DeleteRecipesService(repo);
  });

  it("should delete recipe successfully", async () => {
    repo.findById = jest.fn().mockResolvedValue({ id: 1 });
    repo.delete = jest.fn();

    const result = await service.execute({ id: 1 });

    expect(repo.findById).toHaveBeenCalledWith({ id: 1 });
    expect(repo.delete).toHaveBeenCalledWith({ id: 1 });
    expect(result.message).toBe("Deletado com sucesso");
  });

  it("should throw if recipe not found", async () => {
    repo.findById = jest.fn().mockResolvedValue(null);

    await expect(service.execute({ id: 1 })).rejects.toThrow(
      "Receita não encontrada",
    );
  });
});