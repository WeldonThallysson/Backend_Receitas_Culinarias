import { hash } from "bcryptjs";
import { AppError } from "../../errors/app-error";
import { ICreateUserData } from "../../interfaces/users.interface";
import { UserRepository } from "../../repositories/user.repository";
import { normalizeCharacter } from "../../utils/normalizers/character";
import { isValidEmail, isValidCPF } from "../../utils/validators";

class RegisterService {
  constructor(private userRepository = new UserRepository()) {}
  async execute({ name, login, password }: ICreateUserData) {

    let normalizedLogin = login.trim().toLowerCase();

    const emailValidated = isValidEmail(normalizedLogin);
    const cpfValidated = isValidCPF(normalizedLogin);

    if (!emailValidated && !cpfValidated) {
      throw new AppError("Login deve ser um e-mail ou CPF válido", 400);
    }

    if(normalizedLogin && cpfValidated){
      normalizedLogin = normalizeCharacter(normalizedLogin);
    }

    const existingUser = await this.userRepository.findByLogin({
      login: normalizedLogin,
    });

    if (existingUser) {
      throw new AppError("Login já está em uso", 400);
    }
    const passwordHash = await hash(password, 10);

    try {
      await this.userRepository.create({
        name,
        login: normalizedLogin,
        password: passwordHash,
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
