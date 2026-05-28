import { AppError } from "../../errors/app-error";
import { RecipeRepository } from "../../repositories/recipe.repository";
import { ICreateRecipe } from "../../interfaces/recipes.interface";
import { CategoryRepository } from "../../repositories/category.repository";
import { UserRepository } from "../../repositories/user.repository";

class CreateRecipesService {
  constructor(
    private recipeRepository = new RecipeRepository(),
    private categoryRepository = new CategoryRepository(),
    private userRepository = new UserRepository(),
  ) {}

  async execute({
    user_id,
    category_id,
    name,
    preparation_time_minutes,
    servings,
    preparation_method,
    ingredients,
  }: ICreateRecipe) {
    if (!name) {
      throw new AppError("Nome da receita é obrigatório", 400);
    }
    if (!user_id) {
      throw new AppError("Usuário é obrigatório", 400);
    }

    if (!category_id) {
      throw new AppError("Categoria é obrigatória", 400);
    }

    const category = await this.categoryRepository.findById({
      id: category_id,
    });
    
    const userRepository = await this.userRepository.findById({ id: user_id });

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    if (!userRepository) {
      throw new AppError("Usuário não encontrado", 404);
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
      message: "Cadastro realizado com sucesso",
    };
  }
}

export { CreateRecipesService };
