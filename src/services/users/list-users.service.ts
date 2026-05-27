import { UserRepository } from "../../repositories/user.repository";
import { IParamsUsersFilters } from "../../interfaces/users.interface";

class ListUsersService {
  constructor(private userRepository = new UserRepository()) {}

  async execute(filters: IParamsUsersFilters) {
    const result = await this.userRepository.findAll(filters);

    return {
      items: result.items,
      total: result.total,
    };
  }
}

export { ListUsersService };