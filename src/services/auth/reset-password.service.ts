import { AppError } from "../../errors/app-error";
import { IResetPasswordRequest } from "../../interfaces/auth.interface";
import { AuthRepository } from "../../repositories/auth.repository";
import { normalizeCharacter } from "../../utils/normalizers/character";
import { isValidEmail, isValidCPF } from "../../utils/validators";
import { compare, hash } from "bcryptjs";
class ResetPasswordService {
  async execute({ token, oldPassword, newPassword }: IResetPasswordRequest) {
    const authRepository = new AuthRepository();
    const decodedToken = await authRepository.verifyDecodeToken(token);

    let normalizedLogin = decodedToken?.login.trim().toLowerCase();

    const emailValidated = isValidEmail(normalizedLogin);
    const cpfValidated = isValidCPF(normalizedLogin);

    if (normalizedLogin && cpfValidated) {
      normalizedLogin = normalizeCharacter(normalizedLogin);
    }

    const userLoginExists = await authRepository.findByLogin({
      login: normalizedLogin,
    });

    const oldPasswordUserHash = await compare(
      oldPassword,
      userLoginExists?.senha || "",
    );

    if (!emailValidated && !cpfValidated) {
      throw new AppError("Login deve ser email ou CPF válido", 400);
    }

    if (!oldPasswordUserHash) {
      throw new AppError("Senha atual incorreta", 400);
    }

    if (!userLoginExists) {
      throw new AppError(
        "Login informado não existe ou não está cadastrado",
        404,
      );
    }

    if (oldPassword === newPassword) {
      throw new AppError("A nova senha deve ser diferente da senha atual", 400);
    }

    const newPasswordHash = await hash(newPassword, 10);
    await authRepository.updatePassword(
      { id: userLoginExists.id },
      { password: newPasswordHash },
    );

    return {
      message: "Senha atualizada com sucesso",
    };
  }
}

export { ResetPasswordService };
