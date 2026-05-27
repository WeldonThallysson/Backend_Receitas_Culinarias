import { Router } from "express";
import { ListUsersController } from "../controllers/users/list-users.controller";
import { FindUsersController } from "../controllers/users/find-users.controller";
import { UpdateUsersController } from "../controllers/users/update-users.controller";
import { DeleteUsersController } from "../controllers/users/delete-users.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validateFields } from "../middlewares/validation.middleware";
import { usersFields } from "../validations/users/users.fields";

const usersRoutes = Router();

usersRoutes.get('/', requireAuth, new ListUsersController().handle)
usersRoutes.get('/:id', requireAuth, new FindUsersController().handle)
usersRoutes.put('/:id', requireAuth, validateFields(usersFields), new UpdateUsersController().handle)
usersRoutes.delete('/:id', requireAuth, new DeleteUsersController().handle)

export { usersRoutes }

