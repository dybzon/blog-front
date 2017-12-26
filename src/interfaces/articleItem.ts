export interface IArticleItem {
    Id: number,
    Content: string,
    Type: ArticleItemType,
}

export enum ArticleItemType {
    Text = 1,
    Code = 2,
}