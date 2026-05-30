import { RecipeRepository } from "../../repositories/recipe.repository";
import { IParamsRecipeFilters } from "../../interfaces/recipes.interface";
import { recipeMapper } from "../../mappers/recipe.mapper";
import { characterCase } from "../../utils/normalizers/character";

class ListRecipesService {
  constructor(private recipeRepository = new RecipeRepository()) {}

  async execute(filters: IParamsRecipeFilters) {
    const result = await this.recipeRepository.findAll(filters);
    
    return {
      items: result.items.map((item) => {
        return {
          ...recipeMapper(item),
          category: {
            id: item?.categorias?.id,
            name: characterCase(item?.categorias?.nome)
         
          }
        }
      }),
      total: result.total,
    };
  }
}

export { ListRecipesService };