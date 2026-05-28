"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
const bcryptjs_1 = require("bcryptjs");
const app_error_1 = require("../../errors/app-error");
const user_repository_1 = require("../../repositories/user.repository");
const character_1 = require("../../utils/normalizers/character");
const validators_1 = require("../../utils/validators");
class RegisterService {
    constructor(userRepository = new user_repository_1.UserRepository()) {
        this.userRepository = userRepository;
    }
    async execute({ name, login, password }) {
        let normalizedLogin = login.trim().toLowerCase();
        const emailValidated = (0, validators_1.isValidEmail)(normalizedLogin);
        const cpfValidated = (0, validators_1.isValidCPF)(normalizedLogin);
        if (!emailValidated && !cpfValidated) {
            throw new app_error_1.AppError("Login deve ser um e-mail ou CPF válido", 400);
        }
        if (normalizedLogin && cpfValidated) {
            normalizedLogin = (0, character_1.normalizeCharacter)(normalizedLogin);
        }
        const existingUser = await this.userRepository.findByLogin({
            login: normalizedLogin,
        });
        if (existingUser) {
            throw new app_error_1.AppError("Login já está em uso", 400);
        }
        const passwordHash = await (0, bcryptjs_1.hash)(password, 10);
        try {
            await this.userRepository.create({
                name,
                login: normalizedLogin,
                password: passwordHash,
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
