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
  preparation_time_minutes?: number;
  servings?: number;
  preparation_method: string;
  ingredients?: string;
}

export interface IUpdateRecipe extends Partial<ICreateRecipe> {
  id?: number;
}
