import { DeleteCategoriesService } from "../../../services/categories/delete-categories.service";
import { CategoryRepository } from "../../../repositories/category.repository";

jest.mock("../../../repositories/category.repository");

describe("DeleteCategoriesService", () => {
  let service: DeleteCategoriesService;
  let repo: jest.Mocked<CategoryRepository>;

  beforeEach(() => {
    repo = new CategoryRepository() as jest.Mocked<CategoryRepository>;
    service = new DeleteCategoriesService(repo);
  });

  it("should delete category successfully", async () => {
    repo.findById = jest.fn().mockResolvedValue({ id: 1 });
    repo.delete = jest.fn();

    const result = await service.execute({ id: 1 });

    expect(repo.findById).toHaveBeenCalledWith({ id: 1 });
    expect(repo.delete).toHaveBeenCalledWith({ id: 1 });
    expect(result.message).toBe("Deletado com sucesso");
  });

  it("should throw if category not found", async () => {
    repo.findById = jest.fn().mockResolvedValue(null);

    await expect(service.execute({ id: 1 })).rejects.toThrow(
      "Categoria não encontrada",
    );
  });
});