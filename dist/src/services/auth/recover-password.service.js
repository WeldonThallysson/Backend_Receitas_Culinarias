"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverPasswordService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const app_error_1 = require("../../errors/app-error");
const user_repository_1 = require("../../repositories/user.repository");
const validators_1 = require("../../utils/validators");
class RecoverPasswordService {
    async execute(login) {
        const userRepository = new user_repository_1.UserRepository();
        const normalizedLogin = login.trim().toLowerCase();
        const emailValid = (0, validators_1.isValidEmail)(normalizedLogin);
        const cpfValid = (0, validators_1.isValidCPF)(normalizedLogin);
        if (!emailValid && !cpfValid) {
            throw new app_error_1.AppError("Login deve ser email ou CPF válido", 400);
        }
        const user = await userRepository.findByLogin({
            login: normalizedLogin,
        });
        if (!user) {
            throw new app_error_1.AppError("Login informado não existe ou não está cadastrado", 404);
        }
        const tokenResetPassword = (0, jsonwebtoken_1.sign)({
            login: user.login,
            type: "reset_password",
        }, process.env.JWT_RESET_SECRET_KEY, {
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
