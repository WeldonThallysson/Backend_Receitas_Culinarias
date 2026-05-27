import { AppError } from "../../errors/app-error";
import { ICreateUserData } from "../../interfaces/users.interface";
import { UserRepository } from "../../repositories/user.repository";
import { isValidEmail, isValidCPF } from "../../utils/validators";

class RegisterService {
  async execute({ name, login, password }: ICreateUserData) {
    const userRepository = new UserRepository();

    const normalizedLogin = login.trim().toLowerCase();

    const emailValidated = isValidEmail(normalizedLogin);
    const cpfValidated = isValidCPF(normalizedLogin);

    if (!emailValidated && !cpfValidated) {
      throw new AppError("Login deve ser um e-mail ou CPF válido", 400);
    }

    const existingUser = await userRepository.findByLogin({
      login: normalizedLogin,
    });

    if (existingUser) {
      throw new AppError("Login já está em uso", 400);
    }

    try {
      await userRepository.create({
        name,
        login: normalizedLogin,
        password,
      });

      return {
        message: "Cadastro realizado com sucesso",
      };
    } catch (error) {
      throw new AppError(`Erro ao registrar usuário: ${error}`, 500);
    }
  }
}
export { RegisterService };
