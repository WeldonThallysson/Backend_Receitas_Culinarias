"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reset_password_service_1 = require("../../../services/auth/reset-password.service");
const auth_repository_1 = require("../../../repositories/auth.repository");
const bcryptjs_1 = require("bcryptjs");
jest.mock("../../../repositories/auth.repository");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
describe("ResetPasswordService", () => {
    let service;
    let authRepositoryMock;
    beforeEach(() => {
        authRepositoryMock = new auth_repository_1.AuthRepository();
        service = new reset_password_service_1.ResetPasswordService();
    });
    it("should reset password", async () => {
        authRepositoryMock.verifyDecodeToken = jest.fn().mockResolvedValue({
            login: "test@test.com",
        });
        authRepositoryMock.findByLogin = jest.fn().mockResolvedValue({
            id: 1,
            login: "test@test.com",
            senha: "hashed_old",
        });
        bcryptjs_1.compare.mockResolvedValue(true);
        bcryptjs_1.hash.mockResolvedValue("new_hash");
        authRepositoryMock.updatePassword = jest.fn();
        const result = await service.execute({
            token: "token",
            oldPassword: "123",
            newPassword: "456",
        });
        expect(result.message).toBe("Senha atualizada com sucesso");
    });
});
