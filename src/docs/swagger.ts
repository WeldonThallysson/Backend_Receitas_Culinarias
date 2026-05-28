import { Express } from "express";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const BASE_PORT_SERVER = process.env.BASE_PORT_SERVER || 3000;

const BASE_URL = `${process.env.BASE_URL}:${process.env.BASE_PORT_SERVER}` || `http://localhost:${BASE_PORT_SERVER}`;

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Receitas Culinárias API",
      version: "1.0.0",
      description: "API de gerenciamento de receitas",
    },

    servers: [
      {
        url: BASE_URL,
        description:
          process.env.BASE_DESCRIPTION || "Servidor local",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/routes/*.ts",
    "./src/docs/schemas/*.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customSiteTitle: "Receitas Culinárias API Docs",
      swaggerOptions: {
        persistAuthorization: true,
        deepLinking: true,
      },
    })
  );
};