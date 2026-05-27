"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsersController = void 0;
const update_users_service_1 = require("../../services/users/update-users.service");
class UpdateUsersController {
    async handle(req, res) {
        const { id } = req.params;
        const data = req.body;
        const service = new update_users_service_1.UpdateUsersService();
        const result = await service.execute(Number(id), data);
        return res.status(200).json(result);
    }
}
exports.UpdateUsersController = UpdateUsersController;
