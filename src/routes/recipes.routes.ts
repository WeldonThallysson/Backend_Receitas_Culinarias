import { Router } from "express";

const recipesRoutes = Router();

recipesRoutes.get('/', (req, res) => {})
recipesRoutes.get('/:id', (req, res) => {})
recipesRoutes.post('/', (req, res) => {})
recipesRoutes.put('/:id', (req, res) => {})
recipesRoutes.delete('/:id', (req, res) => {})

export { recipesRoutes }

