"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeMapper = void 0;
const recipeMapper = (recipe) => {
    return {
        id: recipe.id,
        name: recipe.nome,
        ingredients: recipe.ingredientes,
        preparationMethod: recipe.modo_preparo,
        preparationTimeMinutes: recipe.tempo_preparo_minutos,
        servings: recipe.porcoes,
        createdAt: recipe.criado_em,
        updatedAt: recipe.alterado_em,
    };
};
exports.recipeMapper = recipeMapper;
