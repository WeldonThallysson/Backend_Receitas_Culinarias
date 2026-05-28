import { AppError } from "../../errors/app-error";
import { IApiParams } from "../../interfaces/api.interface";
import { userMapper } from "../../mappers/users.mapper";
import { UserRepository } from "../../repositories/user.repository";

class FindUsersService {
  constructor(private userRepository = new UserRepository()) {}

  async execute({id}: IApiParams) {
    const user = await this.userRepository.findById({ id });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return userMapper(user);
  }
}

export { FindUsersService };