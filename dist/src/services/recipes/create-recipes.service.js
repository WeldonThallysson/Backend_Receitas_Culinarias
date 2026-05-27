"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRecipesService = void 0;
const app_error_1 = require("../../errors/app-error");
const recipe_repository_1 = require("../../repositories/recipe.repository");
class CreateRecipesService {
    constructor(recipeRepository = new recipe_repository_1.RecipeRepository()) {
        this.recipeRepository = recipeRepository;
    }
    async execute(data) {
        const { user_id, category_id, name, preparation_time_minutes, servings, preparation_method, ingredients, } = data;
        if (!name) {
            throw new app_error_1.AppError("Nome da receita é obrigatório", 400);
        }
        if (!user_id) {
            throw new app_error_1.AppError("Usuário é obrigatório", 400);
        }
        if (!category_id) {
            throw new app_error_1.AppError("Categoria é obrigatória", 400);
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
exports.CreateRecipesService = CreateRecipesService;
