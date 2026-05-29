export interface IParamsRecipeFilters {
  name?: string;
  user_id?: number;
  category_id?: number;
  created_at_start?: Date;
  created_at_end?: Date;
  updated_at_start?: Date;
  updated_at_end?: Date;
}

export interface ICreateRecipe {
  user_id: number;
  category_id: number;
  name?: string;
  preparationTimeMinutes?: number;
  servings?: number;
  preparationMethod: string;
  ingredients?: string;
}

export interface IUpdateRecipe extends Partial<ICreateRecipe> {
  id?: number;
}
