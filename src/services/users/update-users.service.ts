import { AppError } from "../../errors/app-error";
import { UserRepository } from "../../repositories/user.repository";
import { IUpdateUserData } from "../../interfaces/users.interface";
import bcrypt from "bcryptjs";

class UpdateUsersService {
  constructor(private userRepository = new UserRepository()) {}

  async execute(id: number, data: IUpdateUserData) {
    const user = await this.userRepository.findById({ id });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const updateData: any = {};

    if (data.name) {
      updateData.nome = data.name;
    }

    if (data.login) {
      updateData.login = data.login.trim().toLowerCase();
    }

    if (data.password) {
      updateData.senha = await bcrypt.hash(data.password, 10);
    }

     await this.userRepository.update(
      { id },
      updateData
    );

    return {
       message: "Atualização realizada com sucesso"
    };
  }
}

export { UpdateUsersService };