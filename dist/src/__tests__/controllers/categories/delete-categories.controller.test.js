"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const delete_categories_service_1 = require("../../../services/categories/delete-categories.service");
jest.mock("../../../services/categories/delete-categories.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
    requireAuth: (req, _, next) => {
        req.user_id = 1;
        return next();
    },
}));
describe("DeleteCategoriesController", () => {
    it("should delete category", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            message: "Deletado com sucesso",
        });
        delete_categories_service_1.DeleteCategoriesService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app)
            .delete("/categories/1")
            .send();
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Deletado com sucesso");
    });
});
