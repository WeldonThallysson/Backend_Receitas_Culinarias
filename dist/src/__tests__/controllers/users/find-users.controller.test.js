"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const find_users_service_1 = require("../../../services/users/find-users.service");
jest.mock("../../../services/users/find-users.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
    requireAuth: (req, _, next) => {
        req.user_id = 1;
        return next();
    },
}));
describe("FindUsersController", () => {
    it("should return user by id", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            id: 1,
            name: "João",
            login: "joao@email.com",
        });
        find_users_service_1.FindUsersService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app).get("/users/1");
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });
});
