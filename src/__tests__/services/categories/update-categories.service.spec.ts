import { UpdateCategoriesService } from "../../../services/categories/update-categories.service";
import { CategoryRepository } from "../../../repositories/category.repository";

jest.mock("../../../repositories/category.repository");

describe("UpdateCategoriesService", () => {
  let service: UpdateCategoriesService;
  let repo: jest.Mocked<CategoryRepository>;

  beforeEach(() => {
    repo = new CategoryRepository() as jest.Mocked<CategoryRepository>;
    service = new UpdateCategoriesService(repo);
  });

  it("should update category successfully", async () => {
    repo.findById = jest.fn().mockResolvedValue({ id: 1 });
    repo.update = jest.fn();

    const result = await service.execute(1, { name: "updated" });

    expect(repo.findById).toHaveBeenCalledWith({ id: 1 });
    expect(repo.update).toHaveBeenCalledWith(
      { id: 1 },
      { name: "updated" },
    );

    expect(result.message).toBe("Atualização realizada com sucesso");
  });

  it("should throw if category not found", async () => {
    repo.findById = jest.fn().mockResolvedValue(null);

    await expect(
      service.execute(1, { name: "updated" }),
    ).rejects.toThrow("Categoria não encontrada");
  });
});