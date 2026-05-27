"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUsersController = void 0;
const find_users_service_1 = require("../../services/users/find-users.service");
class FindUsersController {
    async handle(req, res) {
        const { id } = req.params;
        const service = new find_users_service_1.FindUsersService();
        const result = await service.execute({ id: Number(id) });
        return res.status(200).json(result);
    }
}
exports.FindUsersController = FindUsersController;
