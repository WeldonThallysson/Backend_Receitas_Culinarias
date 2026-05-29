import { AppError } from "../../errors/app-error";
import { RecipeRepository } from "../../repositories/recipe.repository";
import { IUpdateRecipe } from "../../interfaces/recipes.interface";
import { UserRepository } from "../../repositories/user.repository";
import { CategoryRepository } from "../../repositories/category.repository";

class UpdateRecipesService {
  constructor(
    private recipeRepository = new RecipeRepository(),
    private categoryRepository = new CategoryRepository(),
    private userRepository = new UserRepository(),
  ) {}

  async execute(
    id: number,
    {
      user_id,
      category_id,
      name,
      preparationTimeMinutes,
      servings,
      preparationMethod,
      ingredients,
    }: IUpdateRecipe,
  ) {
    const recipe = await this.recipeRepository.findById({ id });

    if (!recipe) {
      throw new AppError("Receita não encontrada", 404);
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

    await this.recipeRepository.update(
      { id },
      {
        user_id,
        category_id,
        name,
        preparationTimeMinutes,
        servings,
        preparationMethod,
        ingredients,
      },
    );

    return {
      message: "Atualização realizada com sucesso",
    };
  }
}

export { UpdateRecipesService };
