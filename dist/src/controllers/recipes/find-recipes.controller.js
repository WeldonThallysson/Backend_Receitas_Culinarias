"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindRecipesController = void 0;
const find_recipes_service_1 = require("../../services/recipes/find-recipes.service");
class FindRecipesController {
    async handle(req, res) {
        const { id } = req.params;
        const service = new find_recipes_service_1.FindRecipesService();
        const result = await service.execute({
            id: Number(id)
        });
        return res.status(200).json(result);
    }
}
exports.FindRecipesController = FindRecipesController;
