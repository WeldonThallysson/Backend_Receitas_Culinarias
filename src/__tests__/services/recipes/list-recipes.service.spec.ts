import { ListRecipesService } from "../../../services/recipes/list-recipes.service";
import { RecipeRepository } from "../../../repositories/recipe.repository";

jest.mock("../../../repositories/recipe.repository");

describe("ListRecipesService", () => {
  let service: ListRecipesService;
  let repo: jest.Mocked<RecipeRepository>;

  beforeEach(() => {
    repo = new RecipeRepository() as jest.Mocked<RecipeRepository>;
    service = new ListRecipesService(repo);
  });

  it("should list recipes mapped", async () => {
    repo.findAll = jest.fn().mockResolvedValue({
      items: [
        {
          id: 1,
          nome: "Pizza",
          ingredientes: "cheese",
          modo_preparo: "mix",
          tempo_preparo_minutos: 30,
          porcoes: 2,
        },
      ],
      total: 1,
    });

    const result = await service.execute({});

    expect(result.total).toBe(1);
    expect(result.items.length).toBe(1);
  });
});