import { AppError } from "../../errors/app-error";
import { IApiParams } from "../../interfaces/api.interface";
import { RecipeRepository } from "../../repositories/recipe.repository";

class FindRecipesService {
  constructor(private recipeRepository = new RecipeRepository()) {}

  async execute({id}: IApiParams) {
    const recipe = await this.recipeRepository.findById({ id });

    if (!recipe) {
      throw new AppError("Receita não encontrada", 404);
    }

    return recipe;
  }
}

export { FindRecipesService };