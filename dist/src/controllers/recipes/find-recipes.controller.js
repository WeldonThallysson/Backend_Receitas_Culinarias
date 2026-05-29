"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindRecipesController = void 0;
const find_recipes_service_1 = require("../../services/recipes/find-recipes.service");
class FindRecipesController {
    async handle(req, res) {
        const user_logged = req.user_id;
        const { id } = req.params;
        const service = new find_recipes_service_1.FindRecipesService();
        const result = await service.execute({
            id: Number(id),
            user_id: Number(user_logged)
        });
        return res.status(200).json(result);
    }
}
exports.FindRecipesController = FindRecipesController;
