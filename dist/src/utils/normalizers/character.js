"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCharacter = void 0;
const normalizeCharacter = (str) => {
    return str.replace(/\D/g, "");
};
exports.normalizeCharacter = normalizeCharacter;
