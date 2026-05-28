"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const register_service_1 = require("../../../services/auth/register.service");
jest.mock("../../../services/auth/register.service");
describe("RegisterController", () => {
    it("should register user successfully", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            message: "Cadastro realizado com sucesso",
        });
        register_service_1.RegisterService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app).post("/auth/register").send({
            name: "João",
            login: "test@email.com",
            password: "123456",
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Cadastro realizado com sucesso");
    });
});
