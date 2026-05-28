"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const update_categories_service_1 = require("../../../services/categories/update-categories.service");
jest.mock("../../../services/categories/update-categories.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
    requireAuth: (req, _, next) => {
        req.user_id = 1;
        return next();
    },
}));
describe("UpdateCategoriesController", () => {
    it("should update category", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            message: "Atualização realizada com sucesso",
        });
        update_categories_service_1.UpdateCategoriesService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app)
            .put("/categories/1")
            .send({ name: "Massas atualizada" });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Atualização realizada com sucesso");
    });
});
