"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRecipesController = void 0;
const delete_recipes_service_1 = require("../../services/recipes/delete-recipes.service");
class DeleteRecipesController {
    async handle(req, res) {
        const { id } = req.params;
        const service = new delete_recipes_service_1.DeleteRecipesService();
        const result = await service.execute({
            id: Number(id)
        });
        return res.status(200).json(result);
    }
}
exports.DeleteRecipesController = DeleteRecipesController;
