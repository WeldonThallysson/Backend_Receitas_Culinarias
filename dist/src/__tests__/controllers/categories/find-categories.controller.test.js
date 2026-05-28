"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const find_categories_service_1 = require("../../../services/categories/find-categories.service");
jest.mock("../../../services/categories/find-categories.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
    requireAuth: (req, _, next) => {
        req.user_id = 1;
        return next();
    },
}));
describe("FindCategoriesController", () => {
    it("should return category by id", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            id: 1,
            name: "Massas",
        });
        find_categories_service_1.FindCategoriesService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app).get("/categories/1");
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Massas");
    });
});
