"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock("../../prisma/client", () => ({
    __esModule: true,
    default: {
        usuarios: {
            create: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}));
const user_repository_1 = require("../../repositories/user.repository");
const client_1 = __importDefault(require("../../prisma/client"));
describe("UserRepository", () => {
    const repo = new user_repository_1.UserRepository();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should create a user", async () => {
        jest.mocked(client_1.default.usuarios.create).mockResolvedValue({
            id: 1,
            nome: "John",
            login: "john@email.com",
        });
        const result = await repo.create({
            name: "John",
            login: "john@email.com",
            password: "123",
        });
        expect(client_1.default.usuarios.create).toHaveBeenCalledWith({
            data: {
                nome: "John",
                login: "john@email.com",
                senha: "123",
            },
        });
        expect(result.id).toBe(1);
    });
    it("should find user by id", async () => {
        jest.mocked(client_1.default.usuarios.findUnique).mockResolvedValue({
            id: 1,
            nome: "John",
        });
        const result = await repo.findById({ id: 1 });
        expect(result?.id).toBe(1);
    });
});
