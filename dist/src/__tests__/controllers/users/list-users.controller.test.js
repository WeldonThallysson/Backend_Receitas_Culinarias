"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const list_users_service_1 = require("../../../services/users/list-users.service");
jest.mock("../../../services/users/list-users.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
    requireAuth: (req, _, next) => {
        req.user_id = 1;
        return next();
    },
}));
describe("ListUsersController", () => {
    it("should list users", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            items: [
                { id: 1, name: "João", login: "joao@email.com" },
                { id: 2, name: "Maria", login: "maria@email.com" },
            ],
            total: 2,
        });
        list_users_service_1.ListUsersService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app).get("/users");
        expect(response.status).toBe(200);
        expect(response.body.total).toBe(2);
    });
});
