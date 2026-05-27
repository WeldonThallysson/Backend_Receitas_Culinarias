import { ValidationFields } from "../../types/validation-fields-middleware";

export const resetPasswordFields: ValidationFields = {
  token: true,
  oldPassword: true,
  newPassword: true,
};