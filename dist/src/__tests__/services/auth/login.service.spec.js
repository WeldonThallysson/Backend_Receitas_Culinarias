"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_service_1 = require("../../../services/auth/login.service");
const user_repository_1 = require("../../../repositories/user.repository");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
jest.mock("../../../repositories/user.repository");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
describe("LoginService", () => {
    let service;
    let userRepositoryMock;
    beforeEach(() => {
        userRepositoryMock = new user_repository_1.UserRepository();
        service = new login_service_1.LoginService(userRepositoryMock);
        process.env.JWT_SECRET_KEY = "secret";
    });
    it("should login successfully", async () => {
        userRepositoryMock.findByLogin = jest.fn().mockResolvedValue({
            id: 1,
            nome: "Test",
            login: "test@test.com",
            senha: "hashed_password",
        });
        bcryptjs_1.compare.mockResolvedValue(true);
        jsonwebtoken_1.sign.mockReturnValue("token123");
        const result = await service.execute({
            login: "test@test.com",
            password: "123456",
        });
        expect(result).toHaveProperty("token");
        expect(result.id).toBe(1);
    });
    it("should throw if user not found", async () => {
        userRepositoryMock.findByLogin = jest.fn().mockResolvedValue(null);
        await expect(service.execute({
            login: "test@test.com",
            password: "123456",
        })).rejects.toThrow("Usuário inválido");
    });
});
