import { Request, Response } from "express";
import { FindUsersService } from "../../services/users/find-users.service";

class FindUsersController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new FindUsersService();
    const result = await service.execute({ id: Number(id) });

    return res.status(200).json(result);
  }
}

export { FindUsersController };