"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindRecipesService = void 0;
const app_error_1 = require("../../errors/app-error");
const recipe_mapper_1 = require("../../mappers/recipe.mapper");
const recipe_repository_1 = require("../../repositories/recipe.repository");
class FindRecipesService {
    constructor(recipeRepository = new recipe_repository_1.RecipeRepository()) {
        this.recipeRepository = recipeRepository;
    }
    async execute({ id, user_id }) {
        const recipe = await this.recipeRepository.findById({ id, user_id });
        if (!recipe) {
            throw new app_error_1.AppError("Receita não encontrada", 404);
        }
        return {
            ...(0, recipe_mapper_1.recipeMapper)(recipe),
            category: {
                id: recipe.categorias?.id,
                name: recipe.categorias?.nome
            }
        };
    }
}
exports.FindRecipesService = FindRecipesService;
