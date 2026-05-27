import { Request, Response } from "express";
import { CreateRecipesService } from "../../services/recipes/create-recipes.service";

class CreateRecipesController {
  async handle(req: Request, res: Response) {
    const user_logged = req.user_id;
    const {
      name,
      preparation_method,
      ingredients,
      category_id,
      preparation_time_minutes,
      servings,
    } = req.body;

    const service = new CreateRecipesService();

    const result = await service.execute({
      user_id: user_logged,
      name,
      preparation_method,
      ingredients,
      category_id,
      preparation_time_minutes,
      servings,
    });

    return res.status(201).json(result);
  }
}

export { CreateRecipesController };
