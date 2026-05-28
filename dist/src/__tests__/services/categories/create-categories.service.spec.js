"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_categories_service_1 = require("../../../services/categories/create-categories.service");
const category_repository_1 = require("../../../repositories/category.repository");
jest.mock("../../../repositories/category.repository");
describe("CreateCategoriesService", () => {
    let service;
    let repo;
    beforeEach(() => {
        repo = new category_repository_1.CategoryRepository();
        service = new create_categories_service_1.CreateCategoriesService(repo);
    });
    it("should create category", async () => {
        repo.findByName = jest.fn().mockResolvedValue(null);
        repo.create = jest.fn();
        const result = await service.execute({
            name: "Food",
        });
        expect(result.message).toBe("Cadastro realizado com sucesso");
    });
    it("should throw if category exists", async () => {
        repo.findByName = jest.fn().mockResolvedValue({ id: 1 });
        await expect(service.execute({ name: "Food" })).rejects.toThrow("Categoria já existe");
    });
});
