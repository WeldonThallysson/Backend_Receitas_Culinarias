"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock("../../prisma/client", () => ({
    __esModule: true,
    default: {
        usuarios: {
            findUnique: jest.fn(),
            update: jest.fn(),
        },
    },
}));
const auth_repository_1 = require("../../repositories/auth.repository");
const client_1 = __importDefault(require("../../prisma/client"));
describe("AuthRepository", () => {
    const repo = new auth_repository_1.AuthRepository();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should find user by login", async () => {
        jest.mocked(client_1.default.usuarios.findUnique).mockResolvedValue({
            id: 1,
            login: "test@email.com",
        });
        const result = await repo.findByLogin({
            login: "test@email.com",
        });
        expect(client_1.default.usuarios.findUnique).toHaveBeenCalled();
        expect(result?.login).toBe("test@email.com");
    });
    it("should update user password", async () => {
        jest.mocked(client_1.default.usuarios.update).mockResolvedValue({
            id: 1,
            senha: "hashed_password",
        });
        const result = await repo.updatePassword({ id: 1 }, { password: "hashed_password" });
        expect(client_1.default.usuarios.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { senha: "hashed_password" },
        });
        expect(result.senha).toBe("hashed_password");
    });
});
