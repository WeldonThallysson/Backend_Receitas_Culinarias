"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = require("bcryptjs");
const app_error_1 = require("../../errors/app-error");
const user_repository_1 = require("../../repositories/user.repository");
const validators_1 = require("../../utils/validators");
const character_1 = require("../../utils/normalizers/character");
class LoginService {
    constructor(userRepository = new user_repository_1.UserRepository()) {
        this.userRepository = userRepository;
    }
    async execute({ login, password }) {
        let normalizedLogin = login.trim().toLowerCase();
        const emailValidated = (0, validators_1.isValidEmail)(normalizedLogin);
        const cpfValidated = (0, validators_1.isValidCPF)(normalizedLogin);
        if (!emailValidated && !cpfValidated) {
            throw new app_error_1.AppError("Login deve ser um e-mail ou CPF válido", 400);
        }
        if (normalizedLogin && cpfValidated) {
            normalizedLogin = (0, character_1.normalizeCharacter)(normalizedLogin);
        }
        const user = await this.userRepository.findByLogin({ login: normalizedLogin });
        if (!user) {
            throw new app_error_1.AppError("Usuário inválido", 401);
        }
        const passwordMatch = await (0, bcryptjs_1.compare)(password, user.senha);
        if (!passwordMatch) {
            throw new app_error_1.AppError("Senha inválida", 401);
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
