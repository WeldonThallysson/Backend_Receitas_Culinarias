import prismaClient from "../prisma/client";
import { IApiParams } from "../interfaces/api.interface";
import {
  ICreateRecipe,
  IParamsRecipeFilters,
  IUpdateRecipe,
} from "../interfaces/recipes.interface";

class RecipeRepository {
  async create(payload: ICreateRecipe) {
    return prismaClient.receitas.create({
      data: {
        id_usuarios: payload.user_id,
        id_categorias: payload.category_id,
        nome: payload.name,
        tempo_preparo_minutos: payload.preparation_time_minutes,
        porcoes: payload.servings,
        modo_preparo: payload.preparation_method,
        ingredientes: payload.ingredients,
      },
    });
  }

  async findById({ id }: IApiParams) {
    return prismaClient.receitas.findUnique({
      where: { id },

      include: {
        usuarios: {
          select: {
            id: true,
            nome: true,
            login: true,
          },
        },
        categorias: true,
      },
    });
  }

  async findAll(filters: IParamsRecipeFilters) {
    const {
      name,
      user_id,
      category_id,
      created_at_start,
      created_at_end,
      updated_at_start,
      updated_at_end,
    } = filters;

    const response = await prismaClient.receitas.findMany({
      where: {
        ...(name && {
          nome: {
            contains: name,
            mode: "insensitive",
          },
        }),

        ...(user_id && {
          id_usuarios: user_id,
        }),

        ...(category_id && {
          id_categorias: category_id,
        }),

        ...(created_at_start || created_at_end
          ? {
              criado_em: {
                gte: created_at_start,
                lte: created_at_end,
              },
            }
          : {}),

        ...(updated_at_start || updated_at_end
          ? {
              alterado_em: {
                gte: updated_at_start,
                lte: updated_at_end,
              },
            }
          : {}),
      },

      include: {
        usuarios: {
          select: {
            id: true,
            nome: true,
            login: true,
          },
        },
        categorias: true,
      },

      orderBy: {
        criado_em: "desc",
      },
    });

    return {
      items: response,
      total: response.length,
    };
  }

  async update({ id }: IApiParams, payload: IUpdateRecipe) {
    return prismaClient.receitas.update({
      where: { id },
      data: {
        id_usuarios: payload.user_id,
        id_categorias: payload.category_id,
        nome: payload.name,
        tempo_preparo_minutos: payload.preparation_time_minutes,
        porcoes: payload.servings,
        modo_preparo: payload.preparation_method,
        ingredientes: payload.ingredients,
      },
    });
  }

  async delete({ id }: IApiParams) {
    return prismaClient.receitas.delete({
      where: { id },
    });
  }
}

export { RecipeRepository };
