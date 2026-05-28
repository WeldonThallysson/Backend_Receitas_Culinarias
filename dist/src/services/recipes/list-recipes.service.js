"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRecipesService = void 0;
const recipe_repository_1 = require("../../repositories/recipe.repository");
const recipe_mapper_1 = require("../../mappers/recipe.mapper");
class ListRecipesService {
    constructor(recipeRepository = new recipe_repository_1.RecipeRepository()) {
        this.recipeRepository = recipeRepository;
    }
    async execute(filters) {
        const result = await this.recipeRepository.findAll(filters);
        return {
            items: result.items.map(recipe_mapper_1.recipeMapper),
            total: result.total,
        };
    }
}
exports.ListRecipesService = ListRecipesService;
