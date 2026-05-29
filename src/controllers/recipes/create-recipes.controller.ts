import { Request, Response } from "express";
import { CreateRecipesService } from "../../services/recipes/create-recipes.service";

class CreateRecipesController {
  async handle(req: Request, res: Response) {
    const user_logged = req.user_id;
    const {
      name,
      preparationMethod,
      ingredients,
      category_id,
      preparationTimeMinutes,
      servings,
    } = req.body;

    const service = new CreateRecipesService();

    const result = await service.execute({
      user_id: user_logged,
      name,
      preparationMethod,
      ingredients,
      category_id,
      preparationTimeMinutes,
      servings,
    });

    return res.status(201).json(result);
  }
}

export { CreateRecipesController };
