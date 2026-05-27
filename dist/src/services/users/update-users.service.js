"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsersService = void 0;
const app_error_1 = require("../../errors/app-error");
const user_repository_1 = require("../../repositories/user.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UpdateUsersService {
    constructor(userRepository = new user_repository_1.UserRepository()) {
        this.userRepository = userRepository;
    }
    async execute(id, data) {
        const user = await this.userRepository.findById({ id });
        if (!user) {
            throw new app_error_1.AppError("Usuário não encontrado", 404);
        }
        const updateData = {};
        if (data.name) {
            updateData.nome = data.name;
        }
        if (data.login) {
            updateData.login = data.login.trim().toLowerCase();
        }
        if (data.password) {
            updateData.senha = await bcryptjs_1.default.hash(data.password, 10);
        }
        await this.userRepository.update({ id }, updateData);
        return {
            message: "Atualização realizada com sucesso"
        };
    }
}
exports.UpdateUsersService = UpdateUsersService;
