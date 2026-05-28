import express from 'express';
import cors from 'cors';
import "dotenv/config";

import { setupSwagger } from './docs/swagger';
import { routes } from './routes';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));

app.use(express.json());

app.use(routes);

setupSwagger(app);

export {
  app
};