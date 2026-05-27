"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRecipesService = void 0;
const recipe_repository_1 = require("../../repositories/recipe.repository");
class ListRecipesService {
    constructor(recipeRepository = new recipe_repository_1.RecipeRepository()) {
        this.recipeRepository = recipeRepository;
    }
    async execute(filters) {
        const result = await this.recipeRepository.findAll(filters);
        return {
            items: result.items,
            total: result.total,
        };
    }
}
exports.ListRecipesService = ListRecipesService;
