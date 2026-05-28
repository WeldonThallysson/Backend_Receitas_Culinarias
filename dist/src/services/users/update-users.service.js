"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsersService = void 0;
const app_error_1 = require("../../errors/app-error");
const user_repository_1 = require("../../repositories/user.repository");
const bcryptjs_1 = require("bcryptjs");
const validators_1 = require("../../utils/validators");
const character_1 = require("../../utils/normalizers/character");
class UpdateUsersService {
    constructor(userRepository = new user_repository_1.UserRepository()) {
        this.userRepository = userRepository;
    }
    async execute(id, { login, name, password }) {
        const user = await this.userRepository.findById({ id });
        if (!user) {
            throw new app_error_1.AppError("Usuário não encontrado", 404);
        }
        const updateData = {};
        if (name) {
            updateData.name = name;
        }
        if (login) {
            const normalizedLogin = login.trim().toLowerCase();
            const emailValidated = (0, validators_1.isValidEmail)(normalizedLogin);
            const cpfValidated = (0, validators_1.isValidCPF)(normalizedLogin);
            if (!emailValidated && !cpfValidated) {
                throw new app_error_1.AppError("Login deve ser um e-mail ou CPF válido", 400);
            }
            updateData.login = cpfValidated
                ? (0, character_1.normalizeCharacter)(normalizedLogin)
                : normalizedLogin;
        }
        if (password) {
            updateData.password = await (0, bcryptjs_1.hash)(password, 10);
        }
        await this.userRepository.update({ id }, updateData);
        return {
            message: "Atualização realizada com sucesso",
        };
    }
}
exports.UpdateUsersService = UpdateUsersService;
