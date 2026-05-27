"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const client_1 = __importDefault(require("../prisma/client"));
class CategoryRepository {
    async create(payload) {
        const { name } = payload;
        return client_1.default.categorias.create({
            data: {
                nome: name,
            },
        });
    }
    async findById({ id }) {
        return client_1.default.categorias.findUnique({
            where: { id },
        });
    }
    async findByName({ name }) {
        return client_1.default.categorias.findUnique({
            where: { nome: name },
        });
    }
    async findAll(filters) {
        const { name } = filters;
        const response = await client_1.default.categorias.findMany({
            where: {
                ...(name && {
                    nome: {
                        contains: name,
                        mode: "insensitive",
                    },
                }),
            },
            orderBy: {
                nome: "asc",
            },
        });
        return {
            items: response,
            total: response.length,
        };
    }
    async update({ id }, payload) {
        const { name } = payload;
        return client_1.default.categorias.update({
            where: { id },
            data: {
                nome: name,
            },
        });
    }
    async delete({ id }) {
        return client_1.default.categorias.delete({
            where: { id },
        });
    }
}
exports.CategoryRepository = CategoryRepository;
