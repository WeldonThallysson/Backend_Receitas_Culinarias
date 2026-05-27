import { Request, Response } from "express";
import { UpdateUsersService } from "../../services/users/update-users.service";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    const service = new UpdateUsersService();

    const result = await service.execute(Number(id), data);

    return res.status(200).json(result);
  }
}

export { UpdateUserController };