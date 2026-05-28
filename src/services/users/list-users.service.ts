import { UserRepository } from "../../repositories/user.repository";
import { IParamsUsersFilters } from "../../interfaces/users.interface";
import { userMapper } from "../../mappers/users.mapper";

class ListUsersService {
  constructor(private userRepository = new UserRepository()) {}

  async execute(filters: IParamsUsersFilters) {
    const result = await this.userRepository.findAll(filters);

    return {
      items: result.items.map(userMapper),
      total: result.total,
    };
  }
}

export { ListUsersService };