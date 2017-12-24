import { IArticleMeta, IArticle } from '../interfaces/article';
import { IArticleItem } from '../interfaces/articleItem';
import { Store } from '../stores/store';

export class ArticleService {
    private static EndPoint: String = "http://localhost:64248/"
    private static Operations: any = {
        GetArticles: "api/articles",
        GetArticle: "api/articles/"
    };

    // Get a list of meta data for all articles
    public static GetArticles(store: Store) : void {
        fetch(ArticleService.EndPoint + ArticleService.Operations.GetArticles)
        .then(response => response.json())
        .then(contents => {
            const articles: IArticleMeta[] = contents as IArticleMeta[];
            store.SetArticles(articles);
        });
    }

    // Get a list of all article items for an article id
    public static GetArticleItems(store: Store, articleId: number) : void {
        console.log("Now fetching article items for article: " + articleId);
        fetch(ArticleService.EndPoint + ArticleService.Operations.GetArticle + articleId)
            .then(response => response.json())
            .then(contents => {
                console.log(contents);
                const article: IArticle = contents as IArticle;
                store.SetArticleItems(article.ArticleItems);
            });
    }
}