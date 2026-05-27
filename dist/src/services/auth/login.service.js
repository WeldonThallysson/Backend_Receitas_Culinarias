"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const app_error_1 = require("../../errors/app-error");
const user_repository_1 = require("../../repositories/user.repository");
class LoginService {
    async execute({ login, password }) {
        const userRepository = new user_repository_1.UserRepository();
        const user = await userRepository.findByLogin({ login });
        if (!user) {
            throw new app_error_1.AppError("Usuário ou senha inválidos", 401);
        }
        const passwordMatch = await (0, bcrypt_1.compare)(password, user.senha);
        if (!passwordMatch) {
            throw new app_error_1.AppError("Usuário ou senha inválidos", 401);
        }
        const token = (0, jsonwebtoken_1.sign)({
            name: user.nome,
        }, process.env.JWT_SECRET_KEY, {
            subject: String(user.id),
            expiresIn: "1d",
        });
        return {
            id: user.id,
            token,
            message: `Bem vindo ${user.nome}`,
        };
    }
}
exports.LoginService = LoginService;
