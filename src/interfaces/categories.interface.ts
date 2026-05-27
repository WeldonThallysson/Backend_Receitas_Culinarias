export interface IParamsCategoriesFilters {
    name?: string;
};

export interface ICreateCategories {
    name: string;
}

export interface IUpdateCategories extends Partial<ICreateCategories> {
    id?: number;
}