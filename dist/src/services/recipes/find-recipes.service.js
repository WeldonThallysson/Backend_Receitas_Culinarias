"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindRecipesService = void 0;
const app_error_1 = require("../../errors/app-error");
const recipe_repository_1 = require("../../repositories/recipe.repository");
class FindRecipesService {
    constructor(recipeRepository = new recipe_repository_1.RecipeRepository()) {
        this.recipeRepository = recipeRepository;
    }
    async execute({ id }) {
        const recipe = await this.recipeRepository.findById({ id });
        if (!recipe) {
            throw new app_error_1.AppError("Receita não encontrada", 404);
        }
        return recipe;
    }
}
exports.FindRecipesService = FindRecipesService;
