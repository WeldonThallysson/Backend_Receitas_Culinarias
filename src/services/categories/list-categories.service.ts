import { CategoryRepository } from "../../repositories/category.repository";
import { IParamsCategoriesFilters } from "../../interfaces/categories.interface";

class ListCategoriesService {
  constructor(private categoryRepository = new CategoryRepository()) {}

  async execute(filters: IParamsCategoriesFilters) {
    const result = await this.categoryRepository.findAll(filters);

    return {
      items: result.items,
      total: result.total,
    };
  }
}

export { ListCategoriesService };