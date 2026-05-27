"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRecipesController = void 0;
const update_recipes_service_1 = require("../../services/recipes/update-recipes.service");
class UpdateRecipesController {
    async handle(req, res) {
        const user_logged = req.user_id;
        const { id } = req.params;
        const { name, preparation_method, ingredients, category_id, preparation_time_minutes, servings, } = req.body;
        const service = new update_recipes_service_1.UpdateRecipesService();
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
exports.UpdateRecipesController = UpdateRecipesController;
