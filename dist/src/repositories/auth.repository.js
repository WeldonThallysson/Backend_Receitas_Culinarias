"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthRepository {
    async findByLogin({ login }) {
        return client_1.default.usuarios.findUnique({
            where: { login },
            omit: {
                criado_em: true,
                alterado_em: true,
            },
        });
    }
    async findByPassword({ password }) {
        return client_1.default.usuarios.findFirst({
            where: { senha: password },
        });
    }
    async updatePassword({ id }, payload) {
        const { password } = payload;
        const data = {
            senha: password,
        };
        return client_1.default.usuarios.update({
            where: { id },
            data,
        });
    }
    async verifyDecodeToken(token) {
        const decodedToken = (0, jsonwebtoken_1.decode)(token);
        return {
            login: decodedToken?.login,
        };
    }
}
exports.AuthRepository = AuthRepository;
