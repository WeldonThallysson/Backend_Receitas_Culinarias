"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const list_categories_service_1 = require("../../../services/categories/list-categories.service");
jest.mock("../../../services/categories/list-categories.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
    requireAuth: (req, _, next) => {
        req.user_id = 1;
        return next();
    },
}));
describe("ListCategoriesController", () => {
    it("should list categories", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            items: [
                { id: 1, name: "Massas" },
                { id: 2, name: "Carnes" },
            ],
            total: 2,
        });
        list_categories_service_1.ListCategoriesService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app).get("/categories");
        expect(response.status).toBe(200);
        expect(response.body.total).toBe(2);
    });
});
