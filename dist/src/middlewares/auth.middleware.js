"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const app_error_1 = require("../errors/app-error");
const requireAuth = (req, _, next) => {
    const loggedToken = req.headers.authorization;
    if (!loggedToken) {
        throw new app_error_1.AppError("Solicitação necessita do token de autenticação, faça o login.", 401);
    }
    const [, token] = loggedToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET_KEY);
        req.user_id = Number(sub);
    }
    catch (err) {
        throw new app_error_1.AppError("Solicitação falhou, ocorreu algum erro na verificação do token.", 401);
    }
    return next();
};
exports.requireAuth = requireAuth;
