"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const login_service_1 = require("../../services/auth/login.service");
class LoginController {
    async handle(req, res) {
        const { login, password } = req.body;
        const service = new login_service_1.LoginService();
        const result = await service.execute({
            login,
            password,
        });
        return res.status(200).json(result);
    }
}
exports.LoginController = LoginController;
