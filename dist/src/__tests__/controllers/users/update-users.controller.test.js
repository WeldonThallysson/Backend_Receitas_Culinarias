"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const update_users_service_1 = require("../../../services/users/update-users.service");
jest.mock("../../../services/users/update-users.service");
jest.mock("../../../middlewares/auth.middleware", () => ({
    requireAuth: (req, _, next) => {
        req.user_id = 1;
        return next();
    },
}));
describe("UpdateUsersController", () => {
    it("should update user", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            message: "Atualização realizada com sucesso",
        });
        update_users_service_1.UpdateUsersService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app)
            .put("/users/1")
            .send({
            name: "João atualizado",
            login: "joao@email.com",
            password: "123456",
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Atualização realizada com sucesso");
    });
});
