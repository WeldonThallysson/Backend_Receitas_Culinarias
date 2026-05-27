"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const validations_code_enum_1 = require("../constants/enums/validations-code.enum");
const validateFields = (fields) => {
    return (req, res, next) => {
        const body = req.body;
        const missingFields = [];
        for (const field in fields) {
            const isRequired = fields[field];
            if (!isRequired)
                continue;
            const value = body[field];
            const isEmptyString = typeof value === "string" && value.trim() === "";
            if (value === undefined ||
                value === null ||
                isEmptyString) {
                missingFields.push(field);
            }
        }
        if (missingFields.length > 0) {
            return res.status(400).json({
                code: validations_code_enum_1.ValidationsCode.REQUIRED_FIELDS,
                message: "Missing required fields",
                missingFields,
            });
        }
        next();
    };
};
exports.validateFields = validateFields;
