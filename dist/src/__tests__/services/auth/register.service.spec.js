"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_service_1 = require("../../../services/auth/register.service");
const user_repository_1 = require("../../../repositories/user.repository");
const bcryptjs_1 = require("bcryptjs");
jest.mock("../../../repositories/user.repository");
jest.mock("bcryptjs");
describe("RegisterService", () => {
    let service;
    let userRepositoryMock;
    beforeEach(() => {
        userRepositoryMock = new user_repository_1.UserRepository();
        service = new register_service_1.RegisterService(userRepositoryMock);
    });
    it("should create user", async () => {
        userRepositoryMock.findByLogin = jest.fn().mockResolvedValue(null);
        userRepositoryMock.create = jest.fn();
        bcryptjs_1.hash.mockResolvedValue("hashed_password");
        const result = await service.execute({
            name: "Test",
            login: "test@test.com",
            password: "123456",
        });
        expect(result.message).toBe("Cadastro realizado com sucesso");
    });
});
