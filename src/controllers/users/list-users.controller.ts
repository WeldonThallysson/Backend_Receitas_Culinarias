import { Request, Response } from "express";
import { ListUsersService } from "../../services/users/list-users.service";

class ListUsersController {
  async handle(req: Request, res: Response) {
    const filters = req.query;

    const service = new ListUsersService();
    const result = await service.execute(filters);

    return res.status(200).json(result);
  }
}

export { ListUsersController };