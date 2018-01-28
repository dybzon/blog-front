import { observable, action } from 'mobx';
import { IArticle } from '../interfaces/article';
import { ArticleService } from '../services/articleService';
import { AdminService } from '../services/adminService';

export class ArticleStore {
    @observable public currentArticleId: number;
    @observable public currentArticle: IArticle;

    constructor(articleId: number) {
        if(articleId > 0){
            this.currentArticleId = articleId;
            ArticleService.GetArticle(this, this.currentArticleId);
            this.SetArticle.bind(this);
        }
    }

    @action
    public SetArticle(article: IArticle) : void {
        this.currentArticle = article;
    }

    @action
    public SetArticleId(articleId: number): void {
        this.currentArticleId = articleId;
        this.UpdateArticle();
    }

    @action
    public UpdateArticle(): void {
        ArticleService.GetArticle(this, this.currentArticleId);
    }

    @action
    public SaveArticle(article: IArticle): void {
        AdminService.SaveArticle(article, this);
    }
}