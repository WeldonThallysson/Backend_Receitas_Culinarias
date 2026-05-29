import { Request, Response } from "express";
import { ListRecipesService } from "../../services/recipes/list-recipes.service";

class ListRecipesController {
  async handle(req: Request, res: Response) {
    const user_logged = req.user_id
    const filters = req.query;

    const service = new ListRecipesService();
    const result = await service.execute({
      ...filters,
      user_id: Number(user_logged)
    });

    return res.status(200).json(result);
  }
}

export { ListRecipesController };