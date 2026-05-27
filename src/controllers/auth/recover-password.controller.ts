import { Request, Response } from "express";
import { RecoverPasswordService } from "../../services/auth/recover-password.service";

class RecoverPasswordController {
  async handle(req: Request, res: Response) {
    const { login } = req.body;

    const service = new RecoverPasswordService();

    const result = await service.execute(login);

    return res.status(200).json(result);
  }
}

export { RecoverPasswordController };