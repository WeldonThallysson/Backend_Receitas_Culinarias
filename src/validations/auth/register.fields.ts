import { ValidationFields } from "../../types/validation-fields-middleware";

export const registerFields: ValidationFields = {
  name: true,
  login: true,
  password: true,
};