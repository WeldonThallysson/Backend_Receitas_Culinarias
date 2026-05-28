"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const update_recipes_service_1 = require("../../../services/recipes/update-recipes.service");
jest.mock("../../../services/recipes/update-recipes.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
    requireAuth: (req, _, next) => {
        req.user_id = 1;
        return next();
    },
}));
describe("UpdateRecipesController", () => {
    it("should update recipe", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            message: "Atualização realizada com sucesso",
        });
        update_recipes_service_1.UpdateRecipesService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app)
            .put("/recipes/1")
            .send({
            name: "Lasanha Atualizada",
            preparation_method: "assar",
            ingredients: "massa, queijo",
            category_id: 1,
            preparation_time_minutes: 50,
            servings: 6,
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Atualização realizada com sucesso");
    });
});
