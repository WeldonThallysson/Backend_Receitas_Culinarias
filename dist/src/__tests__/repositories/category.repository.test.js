"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock("../../prisma/client", () => ({
    __esModule: true,
    default: {
        categorias: {
            create: jest.fn(),
            findMany: jest.fn(),
        },
    },
}));
const category_repository_1 = require("../../repositories/category.repository");
const client_1 = __importDefault(require("../../prisma/client"));
describe("CategoryRepository", () => {
    const repo = new category_repository_1.CategoryRepository();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should create a category", async () => {
        jest.mocked(client_1.default.categorias.create).mockResolvedValue({
            id: 1,
            nome: "Pasta",
        });
        const result = await repo.create({ name: "Pasta" });
        expect(client_1.default.categorias.create).toHaveBeenCalledWith({
            data: { nome: "Pasta" },
        });
        expect(result.nome).toBe("Pasta");
    });
    it("should list categories", async () => {
        jest.mocked(client_1.default.categorias.findMany).mockResolvedValue([
            { id: 1, nome: "Pasta" },
        ]);
        const result = await repo.findAll({});
        expect(result.total).toBe(1);
        expect(result.items.length).toBe(1);
    });
});
