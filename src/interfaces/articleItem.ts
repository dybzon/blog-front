export interface IArticleItem {
    Id: number,
    Text: string,
    Type: ArticleItemType,
}

export enum ArticleItemType {
    Text = 1,
    Code = 2,
}