"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindCategoriesController = void 0;
const find_categories_service_1 = require("../../services/categories/find-categories.service");
class FindCategoriesController {
    async handle(req, res) {
        const { id } = req.params;
        const service = new find_categories_service_1.FindCategoriesService();
        const result = await service.execute({
            id: Number(id),
        });
        return res.status(200).json(result);
    }
}
exports.FindCategoriesController = FindCategoriesController;
