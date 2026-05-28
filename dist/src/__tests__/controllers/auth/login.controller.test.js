"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const login_service_1 = require("../../../services/auth/login.service");
jest.mock("../../../services/auth/login.service");
describe("LoginController", () => {
    it("should return token on login success", async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            id: 1,
            token: "fake-token",
            message: "Bem vindo João",
        });
        login_service_1.LoginService.mockImplementation(() => {
            return { execute: mockExecute };
        });
        const response = await (0, supertest_1.default)(app_1.app).post("/auth/login").send({
            login: "test@email.com",
            password: "123456",
        });
        expect(response.status).toBe(200);
        expect(response.body.token).toBe("fake-token");
    });
});
