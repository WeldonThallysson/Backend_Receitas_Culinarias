import { Request, Response } from "express";
import { ResetPasswordService } from "../../services/auth/reset-password.service";

class ResetPasswordController {
  async handle(req: Request, res: Response) {
    const { token, oldPassword, newPassword } = req.body;

    const service = new ResetPasswordService();

    const result = await service.execute({
      token,
      oldPassword,
      newPassword,
    });

    return res.status(200).json(result);
  }
}

export { ResetPasswordController };