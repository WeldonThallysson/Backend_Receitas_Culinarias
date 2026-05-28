import { CategoryRepository } from "../../repositories/category.repository";
import { IParamsCategoriesFilters } from "../../interfaces/categories.interface";
import { categoryMapper } from "../../mappers/category.mapper";

class ListCategoriesService {
  constructor(private categoryRepository = new CategoryRepository()) {}

  async execute(filters: IParamsCategoriesFilters) {
    const result = await this.categoryRepository.findAll(filters);

    return {
      items: result.items.map(categoryMapper),
      total: result.total,
    };
  }
}

export { ListCategoriesService };