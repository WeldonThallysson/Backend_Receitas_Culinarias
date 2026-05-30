"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryMapper = void 0;
const character_1 = require("../utils/normalizers/character");
const categoryMapper = (category) => {
    return {
        id: category.id,
        name: (0, character_1.characterCase)(category.nome)
    };
};
exports.categoryMapper = categoryMapper;
