import { AppError } from "../../errors/app-error";
import { IApiParams } from "../../interfaces/api.interface";
import { CategoryRepository } from "../../repositories/category.repository";

class DeleteCategoriesService {
  constructor(private categoryRepository = new CategoryRepository()) {}

  async execute({id}: IApiParams) {
    const category = await this.categoryRepository.findById({ id });

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    await this.categoryRepository.delete({ id });

    return {
      message: "Deletado com sucesso",
    };
  }
}

export { DeleteCategoriesService };