"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRecipesService = void 0;
const app_error_1 = require("../../errors/app-error");
const recipe_repository_1 = require("../../repositories/recipe.repository");
const user_repository_1 = require("../../repositories/user.repository");
const category_repository_1 = require("../../repositories/category.repository");
class UpdateRecipesService {
    constructor(recipeRepository = new recipe_repository_1.RecipeRepository(), categoryRepository = new category_repository_1.CategoryRepository(), userRepository = new user_repository_1.UserRepository()) {
        this.recipeRepository = recipeRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }
    async execute(id, { user_id, category_id, name, preparationTimeMinutes, servings, preparationMethod, ingredients, }) {
        const recipe = await this.recipeRepository.findById({ id });
        if (!recipe) {
            throw new app_error_1.AppError("Receita não encontrada", 404);
        }
        if (!user_id) {
            throw new app_error_1.AppError("Usuário é obrigatório", 400);
        }
        if (!category_id) {
            throw new app_error_1.AppError("Categoria é obrigatória", 400);
        }
        const category = await this.categoryRepository.findById({
            id: category_id,
        });
        const userRepository = await this.userRepository.findById({ id: user_id });
        if (!category) {
            throw new app_error_1.AppError("Categoria não encontrada", 404);
        }
        if (!userRepository) {
            throw new app_error_1.AppError("Usuário não encontrado", 404);
        }
        await this.recipeRepository.update({ id }, {
            user_id,
            category_id,
            name,
            preparationTimeMinutes,
            servings,
            preparationMethod,
            ingredients,
        });
        return {
            message: "Atualização realizada com sucesso",
        };
    }
}
exports.UpdateRecipesService = UpdateRecipesService;
