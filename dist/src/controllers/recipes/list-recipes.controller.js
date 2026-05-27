"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRecipesController = void 0;
const list_recipes_service_1 = require("../../services/recipes/list-recipes.service");
class ListRecipesController {
    async handle(req, res) {
        const filters = req.query;
        const service = new list_recipes_service_1.ListRecipesService();
        const result = await service.execute(filters);
        return res.status(200).json(result);
    }
}
exports.ListRecipesController = ListRecipesController;
