import { RecipeRepository } from "../../repositories/recipe.repository";
import { IParamsRecipeFilters } from "../../interfaces/recipes.interface";
import { recipeMapper } from "../../mappers/recipe.mapper";

class ListRecipesService {
  constructor(private recipeRepository = new RecipeRepository()) {}

  async execute(filters: IParamsRecipeFilters) {
    const result = await this.recipeRepository.findAll(filters);
    
    return {
      items: result.items.map(recipeMapper),
      total: result.total,
    };
  }
}

export { ListRecipesService };