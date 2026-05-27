import { IApiParams } from "../interfaces/api.interface";
import prismaClient from "../prisma/client";
import { decode } from "jsonwebtoken";

class AuthRepository {
  async findByLogin({ login }: { login: string }) {
    return prismaClient.usuarios.findUnique({
      where: { login },
      omit: {
        criado_em: true,
        alterado_em: true,
      },
    });
  }

  async findByPassword({ password }: { password: string }) {
    return prismaClient.usuarios.findFirst({
      where: { senha: password },
    });
  }

  async updatePassword({ id }: IApiParams, payload: { password: string }) {
    const { password } = payload;

    const data = {
      senha: password,
    };
    return prismaClient.usuarios.update({
      where: { id },
      data,
    });
  }

  async verifyDecodeToken(token: string) {
    const decodedToken = decode(token) as { login: string };

    return {
      login: decodedToken?.login,
    };
  }
}

export { AuthRepository };
