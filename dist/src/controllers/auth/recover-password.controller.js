"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverPasswordController = void 0;
const recover_password_service_1 = require("../../services/auth/recover-password.service");
class RecoverPasswordController {
    async handle(req, res) {
        const { login } = req.body;
        const service = new recover_password_service_1.RecoverPasswordService();
        const result = await service.execute(login);
        return res.status(200).json(result);
    }
}
exports.RecoverPasswordController = RecoverPasswordController;
