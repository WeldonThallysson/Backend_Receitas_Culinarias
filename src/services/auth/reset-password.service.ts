import { AppError } from "../../errors/app-error";
import { IResetPasswordRequest } from "../../interfaces/auth.interface";
import { AuthRepository } from "../../repositories/auth.repository";
import { isValidEmail, isValidCPF } from "../../utils/validators";
import bcrypt from "bcrypt";

class ResetPasswordService {
  async execute({token, oldPassword, newPassword }: IResetPasswordRequest) {
    const authRepository = new AuthRepository();
    const decodedToken = await authRepository.verifyDecodeToken(token);
    
    const normalizedLogin = decodedToken?.login.trim().toLowerCase();

    const emailValid = isValidEmail(normalizedLogin);
    const cpfValid = isValidCPF(normalizedLogin);

    const userLoginExists = await authRepository.findByLogin({ login: normalizedLogin });
    const oldPasswordUserHash = await bcrypt.compare(oldPassword, userLoginExists?.senha || "");

    if (!emailValid && !cpfValid) {
      throw new AppError("Login deve ser email ou CPF válido", 400);
    }
         
    if (!oldPasswordUserHash) {
      throw new AppError("Senha atual incorreta", 400);
    }

    if (!userLoginExists) {
      throw new AppError("Login informado não existe ou não está cadastrado", 404);
    }

    if(oldPassword === newPassword){
        throw new AppError("A nova senha deve ser diferente da senha atual", 400);
    }

    await authRepository.updatePassword(
      { id: userLoginExists.id },
      { password: newPassword }
    );
    
    return {
        message: "Senha atualizada com sucesso",
    };

     
  }
}

export { ResetPasswordService };