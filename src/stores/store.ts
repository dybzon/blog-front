import { observable, action, computed } from 'mobx';
import { IArticleMeta } from '../interfaces/article';
import { IArticleItem } from '../interfaces/articleItem';
import { ArticleService } from '../services/articleService';
import { IMenuCategory, IMenuSubCategory } from '../interfaces/menu';

export class Store {
    @observable public currentArticleId: number;
    @observable public allArticles: IArticleMeta[] = [];
    @observable public currentArticleItems: IArticleItem[] = [];

    constructor() {
        this.currentArticleId = 1;
        ArticleService.GetArticles(this);
        ArticleService.GetArticleItems(this, this.currentArticleId);

        this.SetArticle.bind(this);
    }

    @computed
    public get allMenuCategories() : IMenuCategory[] {
        var menuCategories: IMenuCategory[] = [];
        this.allArticles.forEach(a => {
            var category: IMenuCategory = menuCategories.find(m => m.Category === a.Category);
            if(category == undefined){
                category = {
                    Category: a.Category,
                    SubCategories: [],
                };
                menuCategories.push(category);
            }

            var subCategory: IMenuSubCategory = category.SubCategories.find(s => s.SubCategory === a.SubCategory);
            if(subCategory == undefined){
                subCategory = {
                    SubCategory: a.SubCategory,
                    Articles: [],
                }
                category.SubCategories.push(subCategory);
            }

            subCategory.Articles.push(a);
        });

        return menuCategories;
    }

    @action
    public SetArticles(articles: IArticleMeta[]) : void {
        this.allArticles.splice(0, this.allArticles.length);
        this.allArticles.push(...articles);
    }

    @action
    public SetArticleItems(articleItems: IArticleItem[]) : void {
        this.currentArticleItems.splice(0, this.currentArticleItems.length);
        this.currentArticleItems.push(...articleItems);
    }

    @action
    public SetArticle(articleId: number): void {
        this.currentArticleId = articleId;
        this.UpdateArticleItems();
    }

    @action
    public UpdateArticleItems(): void {
        ArticleService.GetArticleItems(this, this.currentArticleId);
    }
}