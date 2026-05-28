"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordService = void 0;
const app_error_1 = require("../../errors/app-error");
const auth_repository_1 = require("../../repositories/auth.repository");
const character_1 = require("../../utils/normalizers/character");
const validators_1 = require("../../utils/validators");
const bcryptjs_1 = require("bcryptjs");
class ResetPasswordService {
    async execute({ token, oldPassword, newPassword }) {
        const authRepository = new auth_repository_1.AuthRepository();
        const decodedToken = await authRepository.verifyDecodeToken(token);
        let normalizedLogin = decodedToken?.login.trim().toLowerCase();
        const emailValidated = (0, validators_1.isValidEmail)(normalizedLogin);
        const cpfValidated = (0, validators_1.isValidCPF)(normalizedLogin);
        if (normalizedLogin && cpfValidated) {
            normalizedLogin = (0, character_1.normalizeCharacter)(normalizedLogin);
        }
        const userLoginExists = await authRepository.findByLogin({
            login: normalizedLogin,
        });
        const oldPasswordUserHash = await (0, bcryptjs_1.compare)(oldPassword, userLoginExists?.senha || "");
        if (!emailValidated && !cpfValidated) {
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
        const newPasswordHash = await (0, bcryptjs_1.hash)(newPassword, 10);
        await authRepository.updatePassword({ id: userLoginExists.id }, { password: newPasswordHash });
        return {
            message: "Senha atualizada com sucesso",
        };
    }
}
exports.ResetPasswordService = ResetPasswordService;
