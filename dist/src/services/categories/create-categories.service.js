"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoriesService = void 0;
const app_error_1 = require("../../errors/app-error");
const category_repository_1 = require("../../repositories/category.repository");
class CreateCategoriesService {
    constructor(categoryRepository = new category_repository_1.CategoryRepository()) {
        this.categoryRepository = categoryRepository;
    }
    async execute({ name }) {
        const normalizedName = name.trim().toLowerCase();
        if (!normalizedName) {
            throw new app_error_1.AppError("Nome da categoria é obrigatório", 400);
        }
        const existingCategory = await this.categoryRepository.findByName({
            name: normalizedName,
        });
        if (existingCategory) {
            throw new app_error_1.AppError("Categoria já existe", 400);
        }
        await this.categoryRepository.create({
            name: normalizedName,
        });
        return {
            message: "Cadastro realizado com sucesso",
        };
    }
}
exports.CreateCategoriesService = CreateCategoriesService;
