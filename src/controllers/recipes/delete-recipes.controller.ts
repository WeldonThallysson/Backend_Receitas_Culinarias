import { Request, Response } from "express";
import { DeleteRecipesService } from "../../services/recipes/delete-recipes.service";

class DeleteRecipesController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new DeleteRecipesService();
    const result = await service.execute({
      id: Number(id)
    });

    return res.status(200).json(result);
  }
}

export { DeleteRecipesController };