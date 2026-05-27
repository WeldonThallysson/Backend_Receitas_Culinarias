import { IApiParams } from "../interfaces/api.interface";
import {
  ICreateUserData,
  IParamsUsersFilters,
  IUpdateUserData,
} from "../interfaces/users.interface";
import prismaClient from "../prisma/client";

class UserRepository {
  async create(payload: ICreateUserData) {
    const { login, password, name } = payload;

    const data = {
      login,
      nome: name,
      senha: password,
    };

    return prismaClient.usuarios.create({
      data,
    });
  }

  async findById({ id }: IApiParams) {
    return prismaClient.usuarios.findUnique({
      where: { id },
      omit: {
        senha: true,
      },
    });
  }
  
  async findByLogin({ login }: { login: string }) {
    return prismaClient.usuarios.findUnique({
      where: { login },
      omit: {
        criado_em: true,
        alterado_em: true,
      },
    });
  }


  async findAll(filters: IParamsUsersFilters) {
    const {
      name,
      login,
      created_at_start,
      created_at_end,
      updated_at_start,
      updated_at_end,
    } = filters;

    const response = await prismaClient.usuarios.findMany({
      where: {
        ...(name && {
          nome: {
            contains: name,
            mode: "insensitive",
          },
        }),

        ...(login && {
          login: {
            contains: login,
            mode: "insensitive",
          },
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

      omit: {
        senha: true,
      },
    });
    return {
      items: response,
      total: response.length,
    };
  }

  async update({ id }: IApiParams, payload: IUpdateUserData) {
    const { login, password, name } = payload;

    const data = {
      login,
      nome: name,
      senha: password,
    };
    return prismaClient.usuarios.update({
      where: { id },
      data,
    });
  }

  async delete({ id }: IApiParams) {
    return prismaClient.usuarios.delete({
      where: { id },
    });
  }
}

export { UserRepository };
