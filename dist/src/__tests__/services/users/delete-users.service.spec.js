"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_recipes_service_1 = require("../../../../src/services/recipes/delete-recipes.service");
const recipe_repository_1 = require("../../../../src/repositories/recipe.repository");
jest.mock("../../../../src/repositories/recipe.repository");
describe("DeleteRecipesService", () => {
    let service;
    let repo;
    beforeEach(() => {
        repo = new recipe_repository_1.RecipeRepository();
        service = new delete_recipes_service_1.DeleteRecipesService(repo);
    });
    it("should delete recipe successfully", async () => {
        repo.findById = jest.fn().mockResolvedValue({ id: 1 });
        repo.delete = jest.fn();
        const result = await service.execute({ id: 1 });
        expect(repo.findById).toHaveBeenCalledWith({ id: 1 });
        expect(repo.delete).toHaveBeenCalledWith({ id: 1 });
        expect(result.message).toBe("Deletado com sucesso");
    });
    it("should throw if recipe not found", async () => {
        repo.findById = jest.fn().mockResolvedValue(null);
        await expect(service.execute({ id: 1 })).rejects.toThrow("Receita não encontrada");
    });
});
