"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = __importDefault(require("../prisma/client"));
class UserRepository {
    async create(payload) {
        const { login, password, name } = payload;
        const data = {
            login,
            nome: name,
            senha: password,
        };
        return client_1.default.usuarios.create({
            data,
        });
    }
    async findById({ id }) {
        return client_1.default.usuarios.findUnique({
            where: { id },
            omit: {
                senha: true,
            },
        });
    }
    async findByLogin({ login }) {
        return client_1.default.usuarios.findUnique({
            where: { login },
            omit: {
                criado_em: true,
                alterado_em: true,
            },
        });
    }
    async findAll(filters) {
        const { name, login, created_at_start, created_at_end, updated_at_start, updated_at_end, } = filters;
        const response = await client_1.default.usuarios.findMany({
            where: {
                ...(name && {
                    nome: {
                        contains: name,
                        mode: "insensitive",
                    },
                }),
                ...(login && {
                    login: {
                        contains: login,
                        mode: "insensitive",
                    },
                }),
                ...(created_at_start || created_at_end
                    ? {
                        criado_em: {
                            gte: created_at_start,
                            lte: created_at_end,
                        },
                    }
                    : {}),
                ...(updated_at_start || updated_at_end
                    ? {
                        alterado_em: {
                            gte: updated_at_start,
                            lte: updated_at_end,
                        },
                    }
                    : {}),
            },
            omit: {
                senha: true,
            },
        });
        return {
            items: response,
            total: response.length,
        };
    }
    async update({ id }, payload) {
        const { login, password, name } = payload;
        const data = {
            login,
            nome: name,
            senha: password,
        };
        return client_1.default.usuarios.update({
            where: { id },
            data,
        });
    }
    async delete({ id }) {
        return client_1.default.usuarios.delete({
            where: { id },
        });
    }
}
exports.UserRepository = UserRepository;
