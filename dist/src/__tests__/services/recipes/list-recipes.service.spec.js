"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_recipes_service_1 = require("../../../services/recipes/list-recipes.service");
const recipe_repository_1 = require("../../../repositories/recipe.repository");
jest.mock("../../../repositories/recipe.repository");
describe("ListRecipesService", () => {
    let service;
    let repo;
    beforeEach(() => {
        repo = new recipe_repository_1.RecipeRepository();
        service = new list_recipes_service_1.ListRecipesService(repo);
    });
    it("should list recipes mapped", async () => {
        repo.findAll = jest.fn().mockResolvedValue({
            items: [
                {
                    id: 1,
                    nome: "Pizza",
                    ingredientes: "cheese",
                    modo_preparo: "mix",
                    tempo_preparo_minutos: 30,
                    porcoes: 2,
                },
            ],
            total: 1,
        });
        const result = await service.execute({});
        expect(result.total).toBe(1);
        expect(result.items.length).toBe(1);
    });
});
