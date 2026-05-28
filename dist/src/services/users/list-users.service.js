"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersService = void 0;
const user_repository_1 = require("../../repositories/user.repository");
const users_mapper_1 = require("../../mappers/users.mapper");
class ListUsersService {
    constructor(userRepository = new user_repository_1.UserRepository()) {
        this.userRepository = userRepository;
    }
    async execute(filters) {
        const result = await this.userRepository.findAll(filters);
        return {
            items: result.items.map(users_mapper_1.userMapper),
            total: result.total,
        };
    }
}
exports.ListUsersService = ListUsersService;
