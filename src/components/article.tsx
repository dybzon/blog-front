import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { ArticleStore } from '../stores/articleStore';
import { ArticleItemType } from '../interfaces/articleItem';
import Text from './text';
import Code from './codeMirror';
import ArticleHeader from './articleHeader';
import ArticleFooter from './articleFooter';

interface ArticleProps {
    WidthPct: number,
    ArticleId: number,
    MaxWidth?: number,
    BackgroundColor?: string,
    BackgroundColorEnd?: string,
}

@observer
export default class Article extends React.Component<ArticleProps, any> {
    private articleStore: ArticleStore;
    componentWillMount() {
        this.articleStore = new ArticleStore(this.props.ArticleId);
    }

    render() {
        if (this.articleStore.currentArticleId > 0 && this.articleStore.currentArticle == undefined) {
            // Return an empty div until an article is loaded
            return (<div>Loading article...</div>);
        }

        const ArticleDiv = styled.div`
            min-height: 100vh;
            width: ${this.props.WidthPct}vw;
            max-width: ${this.props.MaxWidth ? this.props.MaxWidth : window.innerWidth}px;
            margin: 0 auto;
            ${this.props.BackgroundColor ? 
                ("background: linear-gradient(" + this.props.BackgroundColor + " 20%," 
                    + (this.props.BackgroundColorEnd ? 
                        this.props.BackgroundColorEnd 
                        : this.props.BackgroundColor)+ " 80%);") 
                : "none"}
        `;
        
        // If no article is selected in the path (url), return an empty article
        const emptyArticle = () => (
            <ArticleDiv>
                <ArticleHeader Subject={"What ya lookin' for?"}/>
                <Text Text={"Select your favourite article from the menu <3"} key={"Empty"}/>
            </ArticleDiv>
        );

        // Logic for rendering the actual article
        const article = (props: RouteComponentProps<any>) =>
            {
                const a = this.articleStore.currentArticle;
                const articleHeader = (<ArticleHeader Subject={a.Subject}/>);
                const articleFooter = (<ArticleFooter Author={a.Author} Created={a.Created} Level={a.Level} />);
                const articleItems = a.ArticleItems.map(ai => 
                    ai.Type === ArticleItemType.Text ?
                    <Text Text={ai.Content} key={ai.Id} /> 
                    : <Code Code={ai.Content} key={ai.Id} />);
                    
                return (
                    <ArticleDiv>
                        {articleHeader}
                        {articleItems}
                        {articleFooter}
                    </ArticleDiv>);
            };

        return(            
            <Switch>
                <Route path='/article/:articleId' render={article} />
                <Route path='/article' render={emptyArticle}/>
            </Switch>
        );
    }
}