import { IDictionaryItemInt } from './dictionaryItem';

export interface IArticleItem {
    Id: number,
    Content: string,
    Type: ArticleItemType,
}

export enum ArticleItemType {
    Text = 1,
    Code = 2,
    Image = 3,
}

export const ArticleItemTypeIdentifiers : IDictionaryItemInt[] = [
    {
        key: 1,
        value: "<t>",
    },
    {
        key: 2,
        value: "<c>",
    },
    {
        key: 3,
        value: "<i>",
    }    
];