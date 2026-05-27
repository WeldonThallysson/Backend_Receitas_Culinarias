"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordController = void 0;
const reset_password_service_1 = require("../../services/auth/reset-password.service");
class ResetPasswordController {
    async handle(req, res) {
        const { token, oldPassword, newPassword } = req.body;
        const service = new reset_password_service_1.ResetPasswordService();
        const result = await service.execute({
            token,
            oldPassword,
            newPassword,
        });
        return res.status(200).json(result);
    }
}
exports.ResetPasswordController = ResetPasswordController;
