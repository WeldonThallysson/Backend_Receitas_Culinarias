import { Request, Response } from "express";
import { DeleteUsersService } from "../../services/users/delete-users.service"; 

class DeleteUsersController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new DeleteUsersService();
    const result = await service.execute({ id: Number(id) });

    return res.status(200).json(result);
  }
}

export { DeleteUsersController };