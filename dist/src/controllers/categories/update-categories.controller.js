"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoriesController = void 0;
const update_categories_service_1 = require("../../services/categories/update-categories.service");
class UpdateCategoriesController {
    async handle(req, res) {
        const { id } = req.params;
        const data = req.body;
        const service = new update_categories_service_1.UpdateCategoriesService();
        const result = await service.execute(Number(id), data);
        return res.status(200).json(result);
    }
}
exports.UpdateCategoriesController = UpdateCategoriesController;
