import { AppError } from "../../errors/app-error";
import { CategoryRepository } from "../../repositories/category.repository";
import { IUpdateCategories } from "../../interfaces/categories.interface";

class UpdateCategoriesService {
  constructor(private categoryRepository = new CategoryRepository()) {}

  async execute(id: number, data: IUpdateCategories) {
    const category = await this.categoryRepository.findById({ id });

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    await this.categoryRepository.update({ id }, data);

    return {
      message: "Atualização realizada com sucesso",
    };
  }
}

export { UpdateCategoriesService };