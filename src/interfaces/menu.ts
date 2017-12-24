import { IArticleMeta } from './article';
export interface IMenuCategory {
    Category: string;
    SubCategories: IMenuSubCategory[];
}

export interface IMenuSubCategory {
    SubCategory: string;
    Articles: IArticleMeta[];
}