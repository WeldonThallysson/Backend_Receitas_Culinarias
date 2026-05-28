import { AppError } from "../../errors/app-error";
import { IApiParams } from "../../interfaces/api.interface";
import { categoryMapper } from "../../mappers/category.mapper";
import { CategoryRepository } from "../../repositories/category.repository";

class FindCategoriesService {
  constructor(private categoryRepository = new CategoryRepository()) {}

  async execute({id}: IApiParams) {
    const category = await this.categoryRepository.findById({ id });

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    return categoryMapper(category);
  }
}

export { FindCategoriesService };