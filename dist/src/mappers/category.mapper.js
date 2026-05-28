"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryMapper = void 0;
const categoryMapper = (category) => {
    return {
        id: category.id,
        name: category.nome,
    };
};
exports.categoryMapper = categoryMapper;
