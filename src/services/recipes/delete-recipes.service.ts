import { AppError } from "../../errors/app-error";
import { IApiParams } from "../../interfaces/api.interface";
import { RecipeRepository } from "../../repositories/recipe.repository";

class DeleteRecipesService {
  constructor(private recipeRepository = new RecipeRepository()) {}

  async execute({id}: IApiParams) {
    const recipe = await this.recipeRepository.findById({ id });

    if (!recipe) {
      throw new AppError("Receita não encontrada", 404);
    }

    await this.recipeRepository.delete({ id });

    return {
      message: "Deletado com sucesso",
    };
  }
}

export { DeleteRecipesService };