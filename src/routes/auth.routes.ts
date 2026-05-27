import { Router } from "express";

const authRoutes = Router();

authRoutes.post('/register', (req, res) => {})
authRoutes.post('/login', (req, res) => {})
authRoutes.post('/recover-password', (req, res) => {})
authRoutes.post('/reset-password', (req, res) => {})

export { authRoutes }

