"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const create_recipes_service_1 = require("../../../services/recipes/create-recipes.service");
jest.mock("../../../services/recipes/create-recipes.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
    requireAuth: (req, _, next) => {
        req.user_id = 1;
        return next();
    },
}));
describe("CreateRecipesController", () => {
    it("should create recipe successfully", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            message: "Cadastro realizado com sucesso",
        });
        create_recipes_service_1.CreateRecipesService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app)
            .post("/recipes")
            .send({
            name: "Lasanha",
            preparation_method: "assar",
            ingredients: "massa, queijo",
            category_id: 1,
            preparation_time_minutes: 40,
            servings: 4,
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Cadastro realizado com sucesso");
    });
});
