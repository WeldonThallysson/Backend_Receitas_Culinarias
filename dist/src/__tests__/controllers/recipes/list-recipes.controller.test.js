"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const list_recipes_service_1 = require("../../../services/recipes/list-recipes.service");
jest.mock("../../../services/recipes/list-recipes.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
    requireAuth: (req, _, next) => {
        req.user_id = 1;
        return next();
    },
}));
describe("ListRecipesController", () => {
    it("should list recipes", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            items: [
                { id: 1, name: "Lasanha" },
                { id: 2, name: "Bolo" },
            ],
            total: 2,
        });
        list_recipes_service_1.ListRecipesService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app).get("/recipes");
        expect(response.status).toBe(200);
        expect(response.body.total).toBe(2);
    });
});
