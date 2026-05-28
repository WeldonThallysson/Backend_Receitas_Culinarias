"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMapper = void 0;
const userMapper = (user) => {
    return {
        id: user.id,
        name: user.nome,
        login: user.login,
        createdAt: user.criado_em,
        updatedAt: user.alterado_em,
    };
};
exports.userMapper = userMapper;
