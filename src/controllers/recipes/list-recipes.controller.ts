import { Request, Response } from "express";
import { ListRecipesService } from "../../services/recipes/list-recipes.service";

class ListRecipesController {
  async handle(req: Request, res: Response) {
    const filters = req.query;

    const service = new ListRecipesService();
    const result = await service.execute(filters);

    return res.status(200).json(result);
  }
}

export { ListRecipesController };