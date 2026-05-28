import { sign } from "jsonwebtoken";
import { AppError } from "../../errors/app-error";
import { UserRepository } from "../../repositories/user.repository";
import { isValidEmail, isValidCPF } from "../../utils/validators";
import { normalizeCharacter } from "../../utils/normalizers/character";

class RecoverPasswordService {
  constructor(private userRepository = new UserRepository()) {}

  async execute(login: string) {

    let normalizedLogin = login.trim().toLowerCase();

    const emailValidated = isValidEmail(normalizedLogin);
    const cpfValidated = isValidCPF(normalizedLogin);

    if (!emailValidated && !cpfValidated) {
      throw new AppError("Login deve ser um e-mail ou CPF válido", 400);
    }

    if (normalizedLogin && cpfValidated) {
      normalizedLogin = normalizeCharacter(normalizedLogin);
    }

    if (!emailValidated && !cpfValidated) {
      throw new AppError("Login deve ser email ou CPF válido", 400);
    }

    const user = await this.userRepository.findByLogin({
      login: normalizedLogin,
    });

    if (!user) {
      throw new AppError(
        "Login informado não existe ou não está cadastrado",
        404,
      );
    }

    const jwtResetSecretKey = process.env.JWT_RESET_SECRET_KEY ?? "9f3c2a1d8b6e4c7f9a2d1b3c5e6f7a8b";

    const tokenResetPassword = sign(
      {
        login: user.login,
        type: "reset_password",
      },
      jwtResetSecretKey,
      {
        expiresIn: "15m",
      },
    );

    return {
      canResetPassword: true,
      resetToken: tokenResetPassword,
      message: "Recuperação de senha liberada",
    };
  }
}

export { RecoverPasswordService };
