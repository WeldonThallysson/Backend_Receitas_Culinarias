import { Router } from "express";
import { RegisterController } from "../controllers/auth/register.controller";
import { LoginController } from "../controllers/auth/login.controller";
import { RecoverPasswordController } from "../controllers/auth/recover-password.controller";
import { ResetPasswordController } from "../controllers/auth/reset-password.controller";
import { registerFields } from "../validations/auth/register.fields";
import { validateFields } from "../middlewares/validation.middleware";
import { loginFields } from "../validations/auth/login.fields";
import { recoverPasswordFields } from "../validations/auth/recover-password.fields";
import { resetPasswordFields } from "../validations/auth/reset-password.fields";

const authRoutes = Router();

authRoutes.post("/register", validateFields(registerFields), new RegisterController().handle);
authRoutes.post("/login", validateFields(loginFields), new LoginController().handle);
authRoutes.post("/recover-password", validateFields(recoverPasswordFields), new RecoverPasswordController().handle);
authRoutes.post("/reset-password", validateFields(resetPasswordFields), new ResetPasswordController().handle);

export { authRoutes };
