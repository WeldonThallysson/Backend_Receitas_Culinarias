import { Router } from "express";
import { ListCategoriesController } from "../controllers/categories/list-categories.controller";
import { FindCategoriesController } from "../controllers/categories/find-categories.controller";
import { CreateCategoriesController } from "../controllers/categories/create-categories.controller";
import { UpdateCategoriesController } from "../controllers/categories/update-categories.controller";
import { DeleteCategoriesController } from "../controllers/categories/delete-categories.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validateFields } from "../middlewares/validation.middleware";
import { categoriesFields } from "../validations/categories/categories.fields";

const categoriesRoutes = Router();

categoriesRoutes.get('/', requireAuth, new ListCategoriesController().handle)
categoriesRoutes.get('/:id', requireAuth, new FindCategoriesController().handle)
categoriesRoutes.post('/', requireAuth, validateFields(categoriesFields), new CreateCategoriesController().handle)
categoriesRoutes.put('/:id', requireAuth, validateFields(categoriesFields), new UpdateCategoriesController().handle)
categoriesRoutes.delete('/:id', requireAuth, new DeleteCategoriesController().handle)

export { categoriesRoutes }

