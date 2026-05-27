"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordService = void 0;
const app_error_1 = require("../../errors/app-error");
const auth_repository_1 = require("../../repositories/auth.repository");
const validators_1 = require("../../utils/validators");
const bcrypt_1 = __importDefault(require("bcrypt"));
class ResetPasswordService {
    async execute({ token, oldPassword, newPassword }) {
        const authRepository = new auth_repository_1.AuthRepository();
        const decodedToken = await authRepository.verifyDecodeToken(token);
        const normalizedLogin = decodedToken?.login.trim().toLowerCase();
        const emailValid = (0, validators_1.isValidEmail)(normalizedLogin);
        const cpfValid = (0, validators_1.isValidCPF)(normalizedLogin);
        const userLoginExists = await authRepository.findByLogin({ login: normalizedLogin });
        const oldPasswordUserHash = await bcrypt_1.default.compare(oldPassword, userLoginExists?.senha || "");
        if (!emailValid && !cpfValid) {
            throw new app_error_1.AppError("Login deve ser email ou CPF válido", 400);
        }
        if (!oldPasswordUserHash) {
            throw new app_error_1.AppError("Senha atual incorreta", 400);
        }
        if (!userLoginExists) {
            throw new app_error_1.AppError("Login informado não existe ou não está cadastrado", 404);
        }
        if (oldPassword === newPassword) {
            throw new app_error_1.AppError("A nova senha deve ser diferente da senha atual", 400);
        }
        await authRepository.updatePassword({ id: userLoginExists.id }, { password: newPassword });
        return {
            message: "Senha atualizada com sucesso",
        };
    }
}
exports.ResetPasswordService = ResetPasswordService;
