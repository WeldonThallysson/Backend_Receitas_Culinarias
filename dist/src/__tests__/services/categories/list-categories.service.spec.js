"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_categories_service_1 = require("../../../services/categories/list-categories.service");
const category_repository_1 = require("../../../repositories/category.repository");
jest.mock("../../../repositories/category.repository");
describe("ListCategoriesService", () => {
    let service;
    let repo;
    beforeEach(() => {
        repo = new category_repository_1.CategoryRepository();
        service = new list_categories_service_1.ListCategoriesService(repo);
    });
    it("should list categories mapped", async () => {
        repo.findAll = jest.fn().mockResolvedValue({
            items: [
                { id: 1, nome: "food" },
                { id: 2, nome: "drink" },
            ],
            total: 2,
        });
        const result = await service.execute({});
        expect(result.total).toBe(2);
        expect(result.items).toEqual([
            { id: 1, name: "food" },
            { id: 2, name: "drink" },
        ]);
    });
});
