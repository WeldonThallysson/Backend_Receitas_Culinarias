"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUsersService = void 0;
const app_error_1 = require("../../errors/app-error");
const users_mapper_1 = require("../../mappers/users.mapper");
const user_repository_1 = require("../../repositories/user.repository");
class FindUsersService {
    constructor(userRepository = new user_repository_1.UserRepository()) {
        this.userRepository = userRepository;
    }
    async execute({ id }) {
        const user = await this.userRepository.findById({ id });
        if (!user) {
            throw new app_error_1.AppError("Usuário não encontrado", 404);
        }
        return (0, users_mapper_1.userMapper)(user);
    }
}
exports.FindUsersService = FindUsersService;
