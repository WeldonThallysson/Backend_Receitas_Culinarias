"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverPasswordService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const app_error_1 = require("../../errors/app-error");
const user_repository_1 = require("../../repositories/user.repository");
const validators_1 = require("../../utils/validators");
const character_1 = require("../../utils/normalizers/character");
class RecoverPasswordService {
    constructor(userRepository = new user_repository_1.UserRepository()) {
        this.userRepository = userRepository;
    }
    async execute(login) {
        let normalizedLogin = login.trim().toLowerCase();
        const emailValidated = (0, validators_1.isValidEmail)(normalizedLogin);
        const cpfValidated = (0, validators_1.isValidCPF)(normalizedLogin);
        if (!emailValidated && !cpfValidated) {
            throw new app_error_1.AppError("Login deve ser um e-mail ou CPF válido", 400);
        }
        if (normalizedLogin && cpfValidated) {
            normalizedLogin = (0, character_1.normalizeCharacter)(normalizedLogin);
        }
        if (!emailValidated && !cpfValidated) {
            throw new app_error_1.AppError("Login deve ser email ou CPF válido", 400);
        }
        const user = await this.userRepository.findByLogin({
            login: normalizedLogin,
        });
        if (!user) {
            throw new app_error_1.AppError("Login informado não existe ou não está cadastrado", 404);
        }
        const jwtResetSecretKey = process.env.JWT_RESET_SECRET_KEY ?? "9f3c2a1d8b6e4c7f9a2d1b3c5e6f7a8b";
        const tokenResetPassword = (0, jsonwebtoken_1.sign)({
            login: user.login,
            type: "reset_password",
        }, jwtResetSecretKey, {
            expiresIn: "15m",
        });
        return {
            canResetPassword: true,
            resetToken: tokenResetPassword,
            message: "Recuperação de senha liberada",
        };
    }
}
exports.RecoverPasswordService = RecoverPasswordService;
