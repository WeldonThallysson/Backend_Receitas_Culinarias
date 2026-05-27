import prismaClient from "../prisma/client";
import { IApiParams } from "../interfaces/api.interface";
import {
  ICreateCategories,
  IParamsCategoriesFilters,
  IUpdateCategories,
} from "../interfaces/categories.interface";

class CategoryRepository {
  async create(payload: ICreateCategories) {
    const { name } = payload;

    return prismaClient.categorias.create({
      data: {
        nome: name,
      },
    });
  }

  async findById({ id }: IApiParams) {
    return prismaClient.categorias.findUnique({
      where: { id },
    });
  }

  async findByName({ name }: { name: string }) {
    return prismaClient.categorias.findUnique({
      where: { nome: name },
    });
  }

  async findAll(filters: IParamsCategoriesFilters) {
    const { name } = filters;

    const response = await prismaClient.categorias.findMany({
      where: {
        ...(name && {
          nome: {
            contains: name,
            mode: "insensitive",
          },
        }),
      },

      orderBy: {
        nome: "asc",
      },
    });

    return {
      items: response,
      total: response.length,
    };
  }

  async update({ id }: IApiParams, payload: IUpdateCategories) {
    const { name } = payload;

    return prismaClient.categorias.update({
      where: { id },
      data: {
        nome: name,
      },
    });
  }

  async delete({ id }: IApiParams) {
    return prismaClient.categorias.delete({
      where: { id },
    });
  }
}

export { CategoryRepository };
