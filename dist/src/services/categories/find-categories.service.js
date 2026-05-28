"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindCategoriesService = void 0;
const app_error_1 = require("../../errors/app-error");
const category_mapper_1 = require("../../mappers/category.mapper");
const category_repository_1 = require("../../repositories/category.repository");
class FindCategoriesService {
    constructor(categoryRepository = new category_repository_1.CategoryRepository()) {
        this.categoryRepository = categoryRepository;
    }
    async execute({ id }) {
        const category = await this.categoryRepository.findById({ id });
        if (!category) {
            throw new app_error_1.AppError("Categoria não encontrada", 404);
        }
        return (0, category_mapper_1.categoryMapper)(category);
    }
}
exports.FindCategoriesService = FindCategoriesService;
