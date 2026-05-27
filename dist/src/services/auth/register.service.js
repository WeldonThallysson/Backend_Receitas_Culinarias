"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
const app_error_1 = require("../../errors/app-error");
const user_repository_1 = require("../../repositories/user.repository");
const validators_1 = require("../../utils/validators");
class RegisterService {
    async execute({ name, login, password }) {
        const userRepository = new user_repository_1.UserRepository();
        const normalizedLogin = login.trim().toLowerCase();
        const emailValidated = (0, validators_1.isValidEmail)(normalizedLogin);
        const cpfValidated = (0, validators_1.isValidCPF)(normalizedLogin);
        if (!emailValidated && !cpfValidated) {
            throw new app_error_1.AppError("Login deve ser um e-mail ou CPF válido", 400);
        }
        const existingUser = await userRepository.findByLogin({
            login: normalizedLogin,
        });
        if (existingUser) {
            throw new app_error_1.AppError("Login já está em uso", 400);
        }
        try {
            await userRepository.create({
                name,
                login: normalizedLogin,
                password,
            });
            return {
                message: "Cadastro realizado com sucesso",
            };
        }
        catch (error) {
            throw new app_error_1.AppError(`Erro ao registrar usuário: ${error}`, 500);
        }
    }
}
exports.RegisterService = RegisterService;
