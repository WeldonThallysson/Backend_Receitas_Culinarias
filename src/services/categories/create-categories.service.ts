import { AppError } from "../../errors/app-error";
import { CategoryRepository } from "../../repositories/category.repository";
import { ICreateCategories } from "../../interfaces/categories.interface";

class CreateCategoriesService {
  constructor(private categoryRepository = new CategoryRepository()) {}

  async execute({ name }: ICreateCategories) {
    const normalizedName = name.trim().toLowerCase();

    if (!normalizedName) {
      throw new AppError("Nome da categoria é obrigatório", 400);
    }

    const existingCategory = await this.categoryRepository.findByName({
      name: normalizedName,
    });

    if (existingCategory) {
      throw new AppError("Categoria já existe", 400);
    }

    await this.categoryRepository.create({
      name: normalizedName,
    });

    return {
      message: "Cadastro realizado com sucesso",
    };
  }
}

export { CreateCategoriesService };
