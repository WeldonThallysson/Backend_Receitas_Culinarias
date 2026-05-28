jest.mock("../../prisma/client", () => ({
  __esModule: true,
  default: {
    usuarios: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

import { UserRepository } from "../../repositories/user.repository";
import prismaClient from "../../prisma/client";

describe("UserRepository", () => {
  const repo = new UserRepository();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user", async () => {
    jest.mocked(prismaClient.usuarios.create).mockResolvedValue({
      id: 1,
      nome: "John",
      login: "john@email.com",
    } as any);

    const result = await repo.create({
      name: "John",
      login: "john@email.com",
      password: "123",
    });

    expect(prismaClient.usuarios.create).toHaveBeenCalledWith({
      data: {
        nome: "John",
        login: "john@email.com",
        senha: "123",
      },
    });

    expect(result.id).toBe(1);
  });

  it("should find user by id", async () => {
    jest.mocked(prismaClient.usuarios.findUnique).mockResolvedValue({
      id: 1,
      nome: "John",
    } as any);

    const result = await repo.findById({ id: 1 });

    expect(result?.id).toBe(1);
  });
});