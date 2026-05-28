"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const reset_password_service_1 = require("../../../services/auth/reset-password.service");
jest.mock("../../../services/auth/reset-password.service");
describe("ResetPasswordController", () => {
    it("should reset password successfully", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            message: "Senha atualizada com sucesso",
        });
        reset_password_service_1.ResetPasswordService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app)
            .post("/auth/reset-password")
            .send({
            token: "token",
            oldPassword: "123",
            newPassword: "456",
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Senha atualizada com sucesso");
    });
});
