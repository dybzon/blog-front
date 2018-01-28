import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Article from './article';
import EditArticle from '../adminComponents/editArticle';

interface IMainProps {
}

const Main = (props: IMainProps) => {
    const article = (p: RouteComponentProps<any>) => {
        return <Article WidthPct={80} MaxWidth={800} ArticleId={p.match.params.articleId}/>;
    };

    const editArticle = (p: RouteComponentProps<any>) => {
        return <EditArticle WidthPct={80} MaxWidth={800} ArticleId={p.match.params.articleId} />
    };
    
    return (
        <main>
            <Switch>
                <Route exact path='/article' render={article}/>
                <Route path='/article/:articleId' render={article} />
                <Route path='/admin/edit' render={editArticle} />
                <Route path='/admin/edit/:articleId' render={editArticle} />
            </Switch>
        </main>
    );
}

export default Main;