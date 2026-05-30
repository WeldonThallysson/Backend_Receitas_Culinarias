"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterCase = exports.normalizeCharacter = void 0;
const normalizeCharacter = (str) => {
    return str.replace(/\D/g, "");
};
exports.normalizeCharacter = normalizeCharacter;
const characterCase = (text) => {
    if (!text) {
        return text ?? "";
    }
    const lowerText = text.toLocaleLowerCase('pt-BR').trim();
    const smallWords = new Set([
        'e',
        'de',
        'do',
        'da',
        'dos',
        'das',
        'a',
        'o',
        'os',
        'as',
        'em',
        'no',
        'na',
        'nos',
        'nas',
        'com',
        'sem',
        'por',
        'para',
    ]);
    return lowerText
        .split(/\s+/)
        .map((word, index, array) => {
        if (!word) {
            return '';
        }
        if (index > 0 && index < array.length - 1 && smallWords.has(word)) {
            return word;
        }
        return word[0].toLocaleUpperCase('pt-BR') + word.slice(1);
    })
        .join(' ');
};
exports.characterCase = characterCase;
