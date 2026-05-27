import { RecipeRepository } from "../../repositories/recipe.repository";
import { IParamsRecipeFilters } from "../../interfaces/recipes.interface";

class ListRecipesService {
  constructor(private recipeRepository = new RecipeRepository()) {}

  async execute(filters: IParamsRecipeFilters) {
    const result = await this.recipeRepository.findAll(filters);

    return {
      items: result.items,
      total: result.total,
    };
  }
}

export { ListRecipesService };