import { Router } from "express";

const categoriesRoutes = Router();

categoriesRoutes.get('/', (req, res) => {})
categoriesRoutes.get('/:id', (req, res) => {})
categoriesRoutes.post('/', (req, res) => {})
categoriesRoutes.put('/:id', (req, res) => {})
categoriesRoutes.delete('/:id', (req, res) => {})

export { categoriesRoutes }

