

import {Router} from 'express'
import { authRoutes } from './auth.routes';
import { usersRoutes } from './users.routes';
import { recipesRoutes } from './recipes.routes';
import { categoriesRoutes } from './categories.routes';

const routes = Router();

routes.use('/auth', authRoutes)
routes.use('/users', usersRoutes)
routes.use('/recipes', recipesRoutes)
routes.use('/categories', categoriesRoutes)

export {
    routes
}