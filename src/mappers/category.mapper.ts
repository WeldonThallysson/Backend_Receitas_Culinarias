import { categorias } from "@prisma/client";

export const categoryMapper = (category: categorias ) => {
  return {
    id: category.id,
    name: category.nome,
  };
};