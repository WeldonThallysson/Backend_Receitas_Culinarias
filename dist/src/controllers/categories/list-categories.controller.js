"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoriesController = void 0;
const list_categories_service_1 = require("../../services/categories/list-categories.service");
class ListCategoriesController {
    async handle(req, res) {
        const filters = req.query;
        const service = new list_categories_service_1.ListCategoriesService();
        const result = await service.execute(filters);
        return res.status(200).json(result);
    }
}
exports.ListCategoriesController = ListCategoriesController;
