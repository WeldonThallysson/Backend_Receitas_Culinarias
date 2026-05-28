import { AppError } from "../../errors/app-error";
import { IApiParams } from "../../interfaces/api.interface";
import { recipeMapper } from "../../mappers/recipe.mapper";
import { RecipeRepository } from "../../repositories/recipe.repository";

class FindRecipesService {
  constructor(private recipeRepository = new RecipeRepository()) {}

  async execute({id}: IApiParams) {
    const recipe = await this.recipeRepository.findById({ id });

    if (!recipe) {
      throw new AppError("Receita não encontrada", 404);
    }

    return recipeMapper(recipe);
  }
}

export { FindRecipesService };