"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const find_categories_service_1 = require("../../../services/categories/find-categories.service");
const category_repository_1 = require("../../../repositories/category.repository");
jest.mock("../../../repositories/category.repository");
describe("FindCategoriesService", () => {
    let service;
    let repo;
    beforeEach(() => {
        repo = new category_repository_1.CategoryRepository();
        service = new find_categories_service_1.FindCategoriesService(repo);
    });
    it("should return mapped category", async () => {
        repo.findById = jest.fn().mockResolvedValue({
            id: 1,
            nome: "food",
        });
        const result = await service.execute({ id: 1 });
        expect(repo.findById).toHaveBeenCalledWith({ id: 1 });
        expect(result).toEqual({
            id: 1,
            name: "food",
        });
    });
    it("should throw if category not found", async () => {
        repo.findById = jest.fn().mockResolvedValue(null);
        await expect(service.execute({ id: 1 })).rejects.toThrow("Categoria não encontrada");
    });
});
