"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRecipesController = void 0;
const create_recipes_service_1 = require("../../services/recipes/create-recipes.service");
class CreateRecipesController {
    async handle(req, res) {
        const user_logged = req.user_id;
        const { name, preparation_method, ingredients, category_id, preparation_time_minutes, servings, } = req.body;
        const service = new create_recipes_service_1.CreateRecipesService();
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
exports.CreateRecipesController = CreateRecipesController;
