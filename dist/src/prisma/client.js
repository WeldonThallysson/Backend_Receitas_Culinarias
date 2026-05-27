"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";
const client_1 = require("@prisma/client");
// const adapter = new PrismaMariaDb({
//   host: process.env.DATABASE_HOST,
//   port: Number(process.env.DATABASE_PORT),
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
// })
const prismaClient = new client_1.PrismaClient();
exports.default = prismaClient;
