"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersController = void 0;
const list_users_service_1 = require("../../services/users/list-users.service");
class ListUsersController {
    async handle(req, res) {
        const filters = req.query;
        const service = new list_users_service_1.ListUsersService();
        const result = await service.execute(filters);
        return res.status(200).json(result);
    }
}
exports.ListUsersController = ListUsersController;
