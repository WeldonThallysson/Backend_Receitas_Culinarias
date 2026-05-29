"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_recipes_service_1 = require("../../../../src/services/recipes/update-recipes.service");
const recipe_repository_1 = require("../../../../src/repositories/recipe.repository");
jest.mock("../../../../src/repositories/recipe.repository");
describe("UpdateRecipesService", () => {
    let service;
    let repo;
    beforeEach(() => {
        repo = new recipe_repository_1.RecipeRepository();
        service = new update_recipes_service_1.UpdateRecipesService(repo);
    });
    it("should update recipe successfully", async () => {
        repo.findById = jest.fn().mockResolvedValue({ id: 1 });
        repo.update = jest.fn();
        const result = await service.execute(1, {
            user_id: 1,
            category_id: 1,
            name: "Pizza",
            preparationMethod: "mix",
            ingredients: "cheese",
            preparationTimeMinutes: 30,
            servings: 2,
        });
        expect(repo.findById).toHaveBeenCalledWith({ id: 1 });
        expect(repo.update).toHaveBeenCalled();
        expect(result.message).toBe("Atualização realizada com sucesso");
    });
    it("should throw if recipe not found", async () => {
        repo.findById = jest.fn().mockResolvedValue(null);
        await expect(service.execute(1, {
            user_id: 1,
            category_id: 1,
        })).rejects.toThrow("Receita não encontrada");
    });
});
