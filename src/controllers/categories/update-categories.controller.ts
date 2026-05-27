import { Request, Response } from "express";
import { UpdateCategoriesService } from "../../services/categories/update-categories.service";

class UpdateCategoriesController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    const service = new UpdateCategoriesService();
    const result = await service.execute(Number(id), data);

    return res.status(200).json(result);
  }
}

export { UpdateCategoriesController };