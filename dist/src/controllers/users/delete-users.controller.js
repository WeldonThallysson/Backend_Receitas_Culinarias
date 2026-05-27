"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUsersController = void 0;
const delete_users_service_1 = require("../../services/users/delete-users.service");
class DeleteUsersController {
    async handle(req, res) {
        const { id } = req.params;
        const service = new delete_users_service_1.DeleteUsersService();
        const result = await service.execute({ id: Number(id) });
        return res.status(200).json(result);
    }
}
exports.DeleteUsersController = DeleteUsersController;
