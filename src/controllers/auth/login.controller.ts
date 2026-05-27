import { Request, Response } from "express";
import { LoginService } from "../../services/auth/login.service";

class LoginController {
  async handle(req: Request, res: Response) {
    const { login, password } = req.body;

    const service = new LoginService();

    const result = await service.execute({
      login,
      password,
    });

    return res.status(200).json(result);
  }
}

export { LoginController };