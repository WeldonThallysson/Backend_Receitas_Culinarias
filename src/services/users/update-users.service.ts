import { AppError } from "../../errors/app-error";
import { UserRepository } from "../../repositories/user.repository";
import { IUpdateUserData } from "../../interfaces/users.interface";
import {hash} from "bcryptjs";
import { isValidCPF, isValidEmail } from "../../utils/validators";
import { normalizeCharacter } from "../../utils/normalizers/character";

class UpdateUsersService {
  constructor(private userRepository = new UserRepository()) {}

  async execute(id: number, { login, name, password }: IUpdateUserData) {
    const user = await this.userRepository.findById({ id });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const updateData: any = {};

  
    if (name) {
      updateData.name = name;
    }

    if (login) {
      const normalizedLogin = login.trim().toLowerCase();

      const emailValidated = isValidEmail(normalizedLogin);
      const cpfValidated = isValidCPF(normalizedLogin);

      if (!emailValidated && !cpfValidated) {
        throw new AppError("Login deve ser um e-mail ou CPF válido", 400);
      }

      updateData.login = cpfValidated
        ? normalizeCharacter(normalizedLogin)
        : normalizedLogin;
    }

    if (password) {
      updateData.password = await hash(password, 10);
    }

    await this.userRepository.update({ id }, updateData);

    return {
      message: "Atualização realizada com sucesso",
    };
  }
}


export { UpdateUsersService };
