import { Request, Response } from "express";
import { ListCategoriesService } from "../../services/categories/list-categories.service";

class ListCategoriesController {
  async handle(req: Request, res: Response) {
    const filters = req.query;
    const service = new ListCategoriesService();

    const result = await service.execute(filters);

    return res.status(200).json(result);
  }
}

export { ListCategoriesController };