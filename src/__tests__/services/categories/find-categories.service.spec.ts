import { FindCategoriesService } from "../../../services/categories/find-categories.service";
import { CategoryRepository } from "../../../repositories/category.repository";

jest.mock("../../../repositories/category.repository");

describe("FindCategoriesService", () => {
  let service: FindCategoriesService;
  let repo: jest.Mocked<CategoryRepository>;

  beforeEach(() => {
    repo = new CategoryRepository() as jest.Mocked<CategoryRepository>;
    service = new FindCategoriesService(repo);
  });

  it("should return mapped category", async () => {
    repo.findById = jest.fn().mockResolvedValue({
      id: 1,
      nome: "food",
    });

    const result = await service.execute({ id: 1 });

    expect(repo.findById).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual({
      id: 1,
      name: "food",
    });
  });

  it("should throw if category not found", async () => {
    repo.findById = jest.fn().mockResolvedValue(null);

    await expect(service.execute({ id: 1 })).rejects.toThrow(
      "Categoria não encontrada",
    );
  });
});