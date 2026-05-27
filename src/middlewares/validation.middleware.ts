

import { Request, Response, NextFunction } from "express";
import { ValidationFields } from "../types/validation-fields-middleware";
import { ValidationsCode } from "../constants/enums/validations-code.enum";

export const validateFields = (fields: ValidationFields) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const missingFields: string[] = [];

    for (const field in fields) {
      const isRequired = fields[field];

      if (!isRequired) continue;

      const value = body[field];

      const isEmptyString =
        typeof value === "string" && value.trim() === "";

      if (
        value === undefined ||
        value === null ||
        isEmptyString
      ) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        code: ValidationsCode.REQUIRED_FIELDS,
        message: "Missing required fields",
        missingFields,
      });
    }

    next();
  };
}
