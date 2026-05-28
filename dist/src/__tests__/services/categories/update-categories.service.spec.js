"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_categories_service_1 = require("../../../services/categories/update-categories.service");
const category_repository_1 = require("../../../repositories/category.repository");
jest.mock("../../../repositories/category.repository");
describe("UpdateCategoriesService", () => {
    let service;
    let repo;
    beforeEach(() => {
        repo = new category_repository_1.CategoryRepository();
        service = new update_categories_service_1.UpdateCategoriesService(repo);
    });
    it("should update category successfully", async () => {
        repo.findById = jest.fn().mockResolvedValue({ id: 1 });
        repo.update = jest.fn();
        const result = await service.execute(1, { name: "updated" });
        expect(repo.findById).toHaveBeenCalledWith({ id: 1 });
        expect(repo.update).toHaveBeenCalledWith({ id: 1 }, { name: "updated" });
        expect(result.message).toBe("Atualização realizada com sucesso");
    });
    it("should throw if category not found", async () => {
        repo.findById = jest.fn().mockResolvedValue(null);
        await expect(service.execute(1, { name: "updated" })).rejects.toThrow("Categoria não encontrada");
    });
});
