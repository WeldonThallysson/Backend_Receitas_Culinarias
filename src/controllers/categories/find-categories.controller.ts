import { Request, Response } from "express";
import { FindCategoriesService } from "../../services/categories/find-categories.service";

class FindCategoriesController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new FindCategoriesService();
    const result = await service.execute({
      id: Number(id),
    });

    return res.status(200).json(result);
  }
}

export { FindCategoriesController };