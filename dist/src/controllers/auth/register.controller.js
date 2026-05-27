"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const register_service_1 = require("../../services/auth/register.service");
class RegisterController {
    async handle(req, res) {
        const { name, login, password } = req.body;
        const service = new register_service_1.RegisterService();
        const result = await service.execute({
            name,
            login,
            password,
        });
        return res.status(201).json(result);
    }
}
exports.RegisterController = RegisterController;
