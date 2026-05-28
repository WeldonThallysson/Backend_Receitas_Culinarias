import { receitas } from "@prisma/client";

export const recipeMapper = (recipe: receitas ) => {
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