"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoriesService = void 0;
const app_error_1 = require("../../errors/app-error");
const category_repository_1 = require("../../repositories/category.repository");
class UpdateCategoriesService {
    constructor(categoryRepository = new category_repository_1.CategoryRepository()) {
        this.categoryRepository = categoryRepository;
    }
    async execute(id, data) {
        const category = await this.categoryRepository.findById({ id });
        if (!category) {
            throw new app_error_1.AppError("Categoria não encontrada", 404);
        }
        await this.categoryRepository.update({ id }, data);
        return {
            message: "Atualização realizada com sucesso",
        };
    }
}
exports.UpdateCategoriesService = UpdateCategoriesService;
