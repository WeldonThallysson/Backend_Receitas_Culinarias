import { Request, Response } from "express";
import { UpdateRecipesService } from "../../services/recipes/update-recipes.service";

class UpdateRecipesController {
  async handle(req: Request, res: Response) {
    const user_logged = req.user_id;

    const { id } = req.params;
    const {
      name,
      preparationMethod,
      ingredients,
      category_id,
      preparationTimeMinutes,
      servings,
    } = req.body;

    const service = new UpdateRecipesService();

    const result = await service.execute(Number(id), {
      user_id: user_logged,
      name,
      preparationMethod,
      ingredients,
      category_id,
      preparationTimeMinutes,
      servings,
    });

    return res.status(200).json(result);
  }
}

export { UpdateRecipesController };