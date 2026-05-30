import { categorias } from "@prisma/client";
import { characterCase } from "../utils/normalizers/character";

export const categoryMapper = (category: categorias ) => {
  return {
    id: category.id,
    name: characterCase(category.nome) 
  };
};