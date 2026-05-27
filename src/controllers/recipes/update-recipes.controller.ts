import { Request, Response } from "express";
import { UpdateRecipesService } from "../../services/recipes/update-recipes.service";

class UpdateRecipesController {
  async handle(req: Request, res: Response) {
    const user_logged = req.user_id;

    const { id } = req.params;
    const {
      name,
      preparation_method,
      ingredients,
      category_id,
      preparation_time_minutes,
      servings,
    } = req.body;

    const service = new UpdateRecipesService();

    const result = await service.execute(Number(id), {
      user_id: user_logged,
      name,
      preparation_method,
      ingredients,
      category_id,
      preparation_time_minutes,
      servings,
    });

    return res.status(200).json(result);
  }
}

export { UpdateRecipesController };