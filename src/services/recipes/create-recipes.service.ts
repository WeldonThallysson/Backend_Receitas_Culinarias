import { AppError } from "../../errors/app-error";
import { RecipeRepository } from "../../repositories/recipe.repository"; 
import { ICreateRecipe } from "../../interfaces/recipes.interface";

class CreateRecipesService {
  constructor(private recipeRepository = new RecipeRepository()) {}

  async execute(data: ICreateRecipe) {
    const {
      user_id,
      category_id,
      name,
      preparation_time_minutes,
      servings,
      preparation_method,
      ingredients,
    } = data;

    if (!name) {
      throw new AppError("Nome da receita é obrigatório", 400);
    }

    if (!user_id) {
      throw new AppError("Usuário é obrigatório", 400);
    }

    if (!category_id) {
      throw new AppError("Categoria é obrigatória", 400);
    }

    await this.recipeRepository.create({
      user_id,
      category_id,
      name,
      preparation_time_minutes,
      servings,
      preparation_method,
      ingredients,
    });

    return {
        message: "Cadastro realizado com sucesso"
    };
  }
}

export { CreateRecipesService };