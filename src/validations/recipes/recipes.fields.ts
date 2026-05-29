import { ValidationFields } from "../../types/validation-fields-middleware";

export const recipesFields: ValidationFields = {
  name: true,
  preparationMethod: true,
  ingredients: true,
  category_id: true,
  preparationTimeMinutes: true,
  servings: true,
};    
   
    