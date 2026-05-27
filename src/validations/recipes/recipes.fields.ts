import { ValidationFields } from "../../types/validation-fields-middleware";

export const recipesFields: ValidationFields = {
  name: true,
  preparation_method: true,
  ingredients: true,
  category_id: true,
  preparation_time_minutes: true,
  servings: true,
};    
   
    