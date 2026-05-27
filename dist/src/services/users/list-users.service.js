"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersService = void 0;
const user_repository_1 = require("../../repositories/user.repository");
class ListUsersService {
    constructor(userRepository = new user_repository_1.UserRepository()) {
        this.userRepository = userRepository;
    }
    async execute(filters) {
        const result = await this.userRepository.findAll(filters);
        return {
            items: result.items,
            total: result.total,
        };
    }
}
exports.ListUsersService = ListUsersService;
