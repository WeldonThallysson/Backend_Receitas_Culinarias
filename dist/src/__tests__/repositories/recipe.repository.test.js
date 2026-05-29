"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock("../../prisma/client", () => ({
    __esModule: true,
    default: {
        receitas: {
            create: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}));
const recipe_repository_1 = require("../../repositories/recipe.repository");
const client_1 = __importDefault(require("../../prisma/client"));
describe("RecipeRepository", () => {
    const repo = new recipe_repository_1.RecipeRepository();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should create a recipe", async () => {
        jest.mocked(client_1.default.receitas.create).mockResolvedValue({
            id: 1,
            nome: "Lasagna",
        });
        const result = await repo.create({
            user_id: 1,
            category_id: 2,
            name: "Lasagna",
            preparationTimeMinutes: 40,
            servings: 4,
            preparationMethod: "bake",
            ingredients: "pasta",
        });
        expect(client_1.default.receitas.create).toHaveBeenCalledWith({
            data: expect.objectContaining({
                nome: "Lasagna",
                id_usuarios: 1,
            }),
        });
        expect(result.id).toBe(1);
    });
    it("should find recipe by id", async () => {
        jest.mocked(client_1.default.receitas.findUnique).mockResolvedValue({
            id: 1,
            nome: "Lasagna",
        });
        const result = await repo.findById({ id: 1 });
        expect(result?.id).toBe(1);
    });
});
