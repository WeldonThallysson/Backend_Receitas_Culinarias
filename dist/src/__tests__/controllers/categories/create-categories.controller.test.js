"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const create_categories_service_1 = require("../../../services/categories/create-categories.service");
jest.mock("../../../services/categories/create-categories.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
    requireAuth: (req, _, next) => {
        req.user_id = 1;
        return next();
    },
}));
describe("CreateCategoriesController", () => {
    it("should create category successfully", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            message: "Cadastro realizado com sucesso",
        });
        create_categories_service_1.CreateCategoriesService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app)
            .post("/categories")
            .send({ name: "Massas" });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Cadastro realizado com sucesso");
    });
});
