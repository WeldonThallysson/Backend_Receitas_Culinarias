"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const recover_password_service_1 = require("../../../services/auth/recover-password.service");
jest.mock("../../../services/auth/recover-password.service");
describe("RecoverPasswordController", () => {
    it("should return reset token", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            canResetPassword: true,
            resetToken: "reset-token",
            message: "Recuperação de senha liberada",
        });
        recover_password_service_1.RecoverPasswordService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app)
            .post("/auth/recover-password")
            .send({ login: "test@email.com" });
        expect(response.status).toBe(200);
        expect(response.body.canResetPassword).toBe(true);
    });
});
