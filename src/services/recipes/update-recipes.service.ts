import { AppError } from "../../errors/app-error";
import { RecipeRepository } from "../../repositories/recipe.repository";
import { IUpdateRecipe } from "../../interfaces/recipes.interface";

class UpdateRecipesService {
  constructor(private recipeRepository = new RecipeRepository()) {}

  async execute(id: number, data: IUpdateRecipe) {
    const recipe = await this.recipeRepository.findById({ id });

    if (!recipe) {
      throw new AppError("Receita não encontrada", 404);
    }

    await this.recipeRepository.update(
      { id },
      data
    );

    return {
        message: "Atualização realizada com sucesso"

    };
  }
}

export { UpdateRecipesService };