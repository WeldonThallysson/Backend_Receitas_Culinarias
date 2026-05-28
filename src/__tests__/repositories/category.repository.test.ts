jest.mock("../../prisma/client", () => ({
  __esModule: true,
  default: {
    categorias: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

import { CategoryRepository } from "../../repositories/category.repository";
import prismaClient from "../../prisma/client";

describe("CategoryRepository", () => {
  const repo = new CategoryRepository();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a category", async () => {
    jest.mocked(prismaClient.categorias.create).mockResolvedValue({
      id: 1,
      nome: "Pasta",
    } as any);

    const result = await repo.create({ name: "Pasta" });

    expect(prismaClient.categorias.create).toHaveBeenCalledWith({
      data: { nome: "Pasta" },
    });

    expect(result.nome).toBe("Pasta");
  });

  it("should list categories", async () => {
    jest.mocked(prismaClient.categorias.findMany).mockResolvedValue([
      { id: 1, nome: "Pasta" },
    ] as any);

    const result = await repo.findAll({});

    expect(result.total).toBe(1);
    expect(result.items.length).toBe(1);
  });
});