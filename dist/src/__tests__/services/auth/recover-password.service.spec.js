"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recover_password_service_1 = require("../../../services/auth/recover-password.service");
const user_repository_1 = require("../../../repositories/user.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
jest.mock("../../../repositories/user.repository");
jest.mock("jsonwebtoken");
describe("RecoverPasswordService", () => {
    let service;
    let userRepositoryMock;
    beforeEach(() => {
        userRepositoryMock = new user_repository_1.UserRepository();
        service = new recover_password_service_1.RecoverPasswordService(userRepositoryMock);
    });
    it("should generate reset token", async () => {
        userRepositoryMock.findByLogin = jest.fn().mockResolvedValue({
            id: 1,
            login: "test@test.com",
        });
        jsonwebtoken_1.sign.mockReturnValue("reset_token");
        const result = await service.execute("test@test.com");
        expect(result.resetToken).toBe("reset_token");
    });
    it("should throw if user not found", async () => {
        userRepositoryMock.findByLogin = jest.fn().mockResolvedValue(null);
        await expect(service.execute("test@test.com")).rejects.toThrow();
    });
});
