"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoriesService = void 0;
const category_repository_1 = require("../../repositories/category.repository");
class ListCategoriesService {
    constructor(categoryRepository = new category_repository_1.CategoryRepository()) {
        this.categoryRepository = categoryRepository;
    }
    async execute(filters) {
        const result = await this.categoryRepository.findAll(filters);
        return {
            items: result.items,
            total: result.total,
        };
    }
}
exports.ListCategoriesService = ListCategoriesService;
