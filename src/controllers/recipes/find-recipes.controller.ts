import { Request, Response } from "express";
import { FindRecipesService } from "../../services/recipes/find-recipes.service";

class FindRecipesController {
  async handle(req: Request, res: Response) {
    const user_logged = req.user_id;
    const { id } = req.params;
    const service = new FindRecipesService();
    const result = await service.execute({
      id: Number(id),
      user_id: Number(user_logged)
    });

    return res.status(200).json(result);
  }
}

export { FindRecipesController };