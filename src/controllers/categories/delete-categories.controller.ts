import { Request, Response } from "express";
import { DeleteCategoriesService } from "../../services/categories/delete-categories.service";

class DeleteCategoriesController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new DeleteCategoriesService();
    const result = await service.execute({
      id: Number(id),
    });

    return res.status(200).json(result);
  }
}

export { DeleteCategoriesController };
