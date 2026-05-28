"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_categories_service_1 = require("../../../services/categories/delete-categories.service");
const category_repository_1 = require("../../../repositories/category.repository");
jest.mock("../../../repositories/category.repository");
describe("DeleteCategoriesService", () => {
    let service;
    let repo;
    beforeEach(() => {
        repo = new category_repository_1.CategoryRepository();
        service = new delete_categories_service_1.DeleteCategoriesService(repo);
    });
    it("should delete category successfully", async () => {
        repo.findById = jest.fn().mockResolvedValue({ id: 1 });
        repo.delete = jest.fn();
        const result = await service.execute({ id: 1 });
        expect(repo.findById).toHaveBeenCalledWith({ id: 1 });
        expect(repo.delete).toHaveBeenCalledWith({ id: 1 });
        expect(result.message).toBe("Deletado com sucesso");
    });
    it("should throw if category not found", async () => {
        repo.findById = jest.fn().mockResolvedValue(null);
        await expect(service.execute({ id: 1 })).rejects.toThrow("Categoria não encontrada");
    });
});
