import { Request, Response } from "express";
import { RegisterService } from "../../services/auth/register.service";

class RegisterController {
  async handle(req: Request, res: Response) {
    const { name, login, password } = req.body;

    const service = new RegisterService();
    const result = await service.execute({
      name,
      login,
      password,
    });

    return res.status(201).json(result);
  }
}

export { RegisterController };