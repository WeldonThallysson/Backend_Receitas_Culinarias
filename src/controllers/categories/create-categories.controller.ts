import { Request, Response } from "express";
import { CreateCategoriesService } from "../../services/categories/create-categories.service";

class CreateCategoriesController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    const service = new CreateCategoriesService();
    const result = await service.execute({ name });

    return res.status(201).json(result);
  }
}

export { CreateCategoriesController };
