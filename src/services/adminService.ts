import { IArticle } from '../interfaces/article';
import { ArticleStore } from '../stores/articleStore';

export class AdminService {
    // private static EndPoint: String = "http://localhost:64248/"
    private static EndPoint: String = "http://localhost:54917/"
    private static Operations: any = {
        SaveArticle: "api/admin/save"
    };

    // Save an article
    public static SaveArticle(article: IArticle, store: ArticleStore) : void {
        this.PostRequest(this.Operations.SaveArticle, JSON.stringify(article), store);
    }

    // Posts a request with the given body to the given endpoint/operation
    private static PostRequest(operation: string, body: string, store: ArticleStore): void {
        console.log("Posting request..?");
        const headers: Headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', });
        const requestInit: RequestInit = {
            method: 'POST',
            headers: headers,
            body: body
        };

        fetch(
            AdminService.EndPoint + operation, 
            requestInit)
            .then(response => response.json())
            .then(contents => {
                const article: IArticle = contents as IArticle;
                store.SetArticle(article);
            });

            // .then(response => {
            //     store.UpdateArticle();
            // })
    }
}