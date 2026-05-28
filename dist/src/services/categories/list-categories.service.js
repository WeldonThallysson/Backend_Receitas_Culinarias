"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoriesService = void 0;
const category_repository_1 = require("../../repositories/category.repository");
const category_mapper_1 = require("../../mappers/category.mapper");
class ListCategoriesService {
    constructor(categoryRepository = new category_repository_1.CategoryRepository()) {
        this.categoryRepository = categoryRepository;
    }
    async execute(filters) {
        const result = await this.categoryRepository.findAll(filters);
        return {
            items: result.items.map(category_mapper_1.categoryMapper),
            total: result.total,
        };
    }
}
exports.ListCategoriesService = ListCategoriesService;
