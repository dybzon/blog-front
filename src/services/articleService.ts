import { IArticleMeta, IArticle } from '../interfaces/article';
import { MenuStore } from '../stores/menuStore';
import { ArticleStore } from '../stores/articleStore';

export class ArticleService {
    private static EndPoint: String = "http://localhost:64248/"
    private static Operations: any = {
        GetArticles: "api/articles",
        GetArticle: "api/articles/"
    };

    // Get a list of meta data for all articles, and set it on the store
    public static GetArticles(store: MenuStore) : void {
        fetch(ArticleService.EndPoint + ArticleService.Operations.GetArticles)
        .then(response => response.json())
        .then(contents => {
            const articles: IArticleMeta[] = contents as IArticleMeta[];
            store.SetArticles(articles);
        });
    }

    // Get all article data (including article items) for an article, and set it on the store
    public static GetArticle(store: ArticleStore, articleId: number) : void {
        fetch(ArticleService.EndPoint + ArticleService.Operations.GetArticle + articleId)
            .then(response => response.json())
            .then(contents => {
                const article: IArticle = contents as IArticle;
                store.SetArticle(article);
            });
    }
}