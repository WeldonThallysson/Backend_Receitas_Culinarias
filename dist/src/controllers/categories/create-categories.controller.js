"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoriesController = void 0;
const create_categories_service_1 = require("../../services/categories/create-categories.service");
class CreateCategoriesController {
    async handle(req, res) {
        const { name } = req.body;
        const service = new create_categories_service_1.CreateCategoriesService();
        const result = await service.execute({ name });
        return res.status(201).json(result);
    }
}
exports.CreateCategoriesController = CreateCategoriesController;
