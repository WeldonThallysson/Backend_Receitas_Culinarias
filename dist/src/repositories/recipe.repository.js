"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRepository = void 0;
const client_1 = __importDefault(require("../prisma/client"));
class RecipeRepository {
    async create(payload) {
        return client_1.default.receitas.create({
            data: {
                id_usuarios: payload.user_id,
                id_categorias: payload.category_id,
                nome: payload.name,
                tempo_preparo_minutos: payload.preparation_time_minutes,
                porcoes: payload.servings,
                modo_preparo: payload.preparation_method,
                ingredientes: payload.ingredients,
            },
        });
    }
    async findById({ id, user_id }) {
        return client_1.default.receitas.findUnique({
            where: { id, id_usuarios: user_id },
            include: {
                usuarios: {
                    select: {
                        id: true,
                        nome: true,
                        login: true,
                    },
                },
                categorias: true,
            },
        });
    }
    async findAll(filters) {
        const { name, user_id, category_id, created_at_start, created_at_end, updated_at_start, updated_at_end, } = filters;
        const response = await client_1.default.receitas.findMany({
            where: {
                ...(name && {
                    nome: {
                        contains: name,
                        mode: "insensitive",
                    },
                }),
                ...(user_id && {
                    id_usuarios: user_id,
                }),
                ...(category_id && {
                    id_categorias: category_id,
                }),
                ...(created_at_start || created_at_end
                    ? {
                        criado_em: {
                            gte: created_at_start,
                            lte: created_at_end,
                        },
                    }
                    : {}),
                ...(updated_at_start || updated_at_end
                    ? {
                        alterado_em: {
                            gte: updated_at_start,
                            lte: updated_at_end,
                        },
                    }
                    : {}),
            },
            include: {
                usuarios: {
                    select: {
                        id: true,
                        nome: true,
                        login: true,
                    },
                },
                categorias: true,
            },
            orderBy: {
                criado_em: "desc",
            },
        });
        return {
            items: response,
            total: response.length,
        };
    }
    async update({ id }, payload) {
        return client_1.default.receitas.update({
            where: { id },
            data: {
                id_usuarios: payload.user_id,
                id_categorias: payload.category_id,
                nome: payload.name,
                tempo_preparo_minutos: payload.preparation_time_minutes,
                porcoes: payload.servings,
                modo_preparo: payload.preparation_method,
                ingredientes: payload.ingredients,
            },
        });
    }
    async delete({ id }) {
        return client_1.default.receitas.delete({
            where: { id },
        });
    }
}
exports.RecipeRepository = RecipeRepository;
