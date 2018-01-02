import { IArticleMeta } from './article';
export interface IMenuCategory {
    Category: string;
    IsActive?: boolean;
    SubCategories: IMenuSubCategory[];
}

export interface IMenuSubCategory {
    SubCategory: string;
    IsActive?: boolean;
    Articles: IArticleMeta[];
}