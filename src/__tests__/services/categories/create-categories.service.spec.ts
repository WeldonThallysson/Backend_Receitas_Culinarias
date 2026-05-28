import { CreateCategoriesService } from "../../../services/categories/create-categories.service";
import { CategoryRepository } from "../../../repositories/category.repository";

jest.mock("../../../repositories/category.repository");

describe("CreateCategoriesService", () => {
  let service: CreateCategoriesService;
  let repo: jest.Mocked<CategoryRepository>;

  beforeEach(() => {
    repo = new CategoryRepository() as jest.Mocked<CategoryRepository>;
    service = new CreateCategoriesService(repo);
  });

  it("should create category", async () => {
    repo.findByName = jest.fn().mockResolvedValue(null);
    repo.create = jest.fn();

    const result = await service.execute({
      name: "Food",
    });

    expect(result.message).toBe("Cadastro realizado com sucesso");
  });

  it("should throw if category exists", async () => {
    repo.findByName = jest.fn().mockResolvedValue({ id: 1 });

    await expect(
      service.execute({ name: "Food" }),
    ).rejects.toThrow("Categoria já existe");
  });
});