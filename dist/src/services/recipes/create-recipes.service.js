"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRecipesService = void 0;
const app_error_1 = require("../../errors/app-error");
const recipe_repository_1 = require("../../repositories/recipe.repository");
const category_repository_1 = require("../../repositories/category.repository");
const user_repository_1 = require("../../repositories/user.repository");
class CreateRecipesService {
    constructor(recipeRepository = new recipe_repository_1.RecipeRepository(), categoryRepository = new category_repository_1.CategoryRepository(), userRepository = new user_repository_1.UserRepository()) {
        this.recipeRepository = recipeRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }
    async execute({ user_id, category_id, name, preparation_time_minutes, servings, preparation_method, ingredients, }) {
        if (!name) {
            throw new app_error_1.AppError("Nome da receita é obrigatório", 400);
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
exports.CreateRecipesService = CreateRecipesService;
