import { Router } from "express";

const usersRoutes = Router();

usersRoutes.get('/', (req, res) => {})
usersRoutes.get('/:id', (req, res) => {})
usersRoutes.post('/', (req, res) => {})
usersRoutes.put('/:id', (req, res) => {})
usersRoutes.delete('/:id', (req, res) => {})

export { usersRoutes }

