import { IArticleItem } from './articleItem';

export interface IArticleMeta {
    Id: number,
    Subject: string,
    Author: string,
    Category: string,
    SubCategory: string,
    Level: number,
    Created: Date,    
}

export interface IArticle extends IArticleMeta {
    ArticleItems: IArticleItem[],
}
