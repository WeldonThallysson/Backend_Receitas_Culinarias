"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const BASE_PORT_SERVER = process.env.BASE_PORT_SERVER || 3000;
const BASE_URL = `${process.env.BASE_URL}:${process.env.BASE_PORT_SERVER}` || `http://localhost:${BASE_PORT_SERVER}`;
const options = {
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
                description: process.env.BASE_DESCRIPTION || "Servidor local",
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, {
        explorer: true,
        customSiteTitle: "Receitas Culinárias API Docs",
        swaggerOptions: {
            persistAuthorization: true,
            deepLinking: true,
        },
    }));
};
exports.setupSwagger = setupSwagger;
