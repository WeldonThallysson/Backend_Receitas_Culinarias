"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.BASE_PORT_SERVER || 3000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
app_1.app.listen(PORT, () => {
    console.log(`
========================================
|
| Application started successfully
|
| Environment : ${ENVIRONMENT}
| Port        : ${PORT}
| URL         : ${BASE_URL}:${PORT}
| Swagger     : ${BASE_URL}:${PORT}/docs
========================================
`);
});
