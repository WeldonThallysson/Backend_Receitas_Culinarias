"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoriesController = void 0;
const delete_categories_service_1 = require("../../services/categories/delete-categories.service");
class DeleteCategoriesController {
    async handle(req, res) {
        const { id } = req.params;
        const service = new delete_categories_service_1.DeleteCategoriesService();
        const result = await service.execute({
            id: Number(id),
        });
        return res.status(200).json(result);
    }
}
exports.DeleteCategoriesController = DeleteCategoriesController;
