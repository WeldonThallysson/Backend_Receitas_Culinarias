"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRecipesService = void 0;
const recipe_repository_1 = require("../../repositories/recipe.repository");
const recipe_mapper_1 = require("../../mappers/recipe.mapper");
const character_1 = require("../../utils/normalizers/character");
class ListRecipesService {
    constructor(recipeRepository = new recipe_repository_1.RecipeRepository()) {
        this.recipeRepository = recipeRepository;
    }
    async execute(filters) {
        const result = await this.recipeRepository.findAll(filters);
        return {
            items: result.items.map((item) => {
                return {
                    ...(0, recipe_mapper_1.recipeMapper)(item),
                    category: {
                        id: item?.categorias?.id,
                        name: (0, character_1.characterCase)(item?.categorias?.nome)
                    }
                };
            }),
            total: result.total,
        };
    }
}
exports.ListRecipesService = ListRecipesService;
