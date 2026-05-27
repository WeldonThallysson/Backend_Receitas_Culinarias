import { sign } from "jsonwebtoken";
import { AppError } from "../../errors/app-error";
import { UserRepository } from "../../repositories/user.repository";
import { isValidEmail, isValidCPF } from "../../utils/validators";

class RecoverPasswordService {
  async execute(login: string) {
    const userRepository = new UserRepository();
    const normalizedLogin = login.trim().toLowerCase();

    const emailValid = isValidEmail(normalizedLogin);
    const cpfValid = isValidCPF(normalizedLogin);

    if (!emailValid && !cpfValid) {
      throw new AppError("Login deve ser email ou CPF válido", 400);
    }

    const user = await userRepository.findByLogin({
      login: normalizedLogin,
    });

    if (!user) {
      throw new AppError(
        "Login informado não existe ou não está cadastrado",
        404
      );
    }

    const tokenResetPassword = sign(
      {
        login: user.login,
        type: "reset_password",
      },
      process.env.JWT_RESET_SECRET_KEY!,
      {
        expiresIn: "15m",
      }
    );

    return {
      canResetPassword: true,
      resetToken: tokenResetPassword,
      message: "Recuperação de senha liberada",
    };
  }
}

export { RecoverPasswordService };