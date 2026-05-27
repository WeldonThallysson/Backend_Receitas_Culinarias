import { Router } from "express";
import { FindRecipesController } from "../controllers/recipes/find-recipes.controller";
import { ListRecipesController } from "../controllers/recipes/list-recipes.controller";
import { UpdateRecipesController } from "../controllers/recipes/update-recipes.controller";
import { CreateRecipesController } from "../controllers/recipes/create-recipes.controller";
import { DeleteRecipesController } from "../controllers/recipes/delete-recipes.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validateFields } from "../middlewares/validation.middleware";
import { recipesFields } from "../validations/recipes/recipes.fields";

const recipesRoutes = Router();

recipesRoutes.get("/", requireAuth, new ListRecipesController().handle);
recipesRoutes.get("/:id", requireAuth, new FindRecipesController().handle);
recipesRoutes.post("/", requireAuth, validateFields(recipesFields), new CreateRecipesController().handle);
recipesRoutes.put("/:id", requireAuth, validateFields(recipesFields), new UpdateRecipesController().handle);
recipesRoutes.delete("/:id", requireAuth, new DeleteRecipesController().handle);

export { recipesRoutes };
