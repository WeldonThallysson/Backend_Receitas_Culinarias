import { ListCategoriesService } from "../../../services/categories/list-categories.service";
import { CategoryRepository } from "../../../repositories/category.repository";

jest.mock("../../../repositories/category.repository");

describe("ListCategoriesService", () => {
  let service: ListCategoriesService;
  let repo: jest.Mocked<CategoryRepository>;

  beforeEach(() => {
    repo = new CategoryRepository() as jest.Mocked<CategoryRepository>;
    service = new ListCategoriesService(repo);
  });

  it("should list categories mapped", async () => {
    repo.findAll = jest.fn().mockResolvedValue({
      items: [
        { id: 1, nome: "Food" },
        { id: 2, nome: "Drink" },
      ],
      total: 2,
    });

    const result = await service.execute({});

    expect(result.total).toBe(2);
    expect(result.items).toEqual([
      { id: 1, name: "Food" },
      { id: 2, name: "Drink" },
    ]);
  });
});