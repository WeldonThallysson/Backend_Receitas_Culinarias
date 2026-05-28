jest.mock("../../prisma/client", () => ({
  __esModule: true,
  default: {
    usuarios: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

import { AuthRepository } from "../../repositories/auth.repository";
import prismaClient from "../../prisma/client";

describe("AuthRepository", () => {
  const repo = new AuthRepository();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should find user by login", async () => {
    jest.mocked(prismaClient.usuarios.findUnique).mockResolvedValue({
      id: 1,
      login: "test@email.com",
    } as any);

    const result = await repo.findByLogin({
      login: "test@email.com",
    });

    expect(prismaClient.usuarios.findUnique).toHaveBeenCalled();
    expect(result?.login).toBe("test@email.com");
  });

  it("should update user password", async () => {
    jest.mocked(prismaClient.usuarios.update).mockResolvedValue({
      id: 1,
      senha: "hashed_password",
    } as any);

    const result = await repo.updatePassword(
      { id: 1 },
      { password: "hashed_password" }
    );

    expect(prismaClient.usuarios.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { senha: "hashed_password" },
    });

    expect(result.senha).toBe("hashed_password");
  });
});