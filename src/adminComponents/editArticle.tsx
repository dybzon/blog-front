import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Textarea from '../adminComponents/textarea';
import ArticleForm from '../adminComponents/articleForm';
import Button from '../adminComponents/button';
import Textinput from '../adminComponents/textinput';
import { IArticleItem, ArticleItemType, ArticleItemTypeIdentifiers } from '../interfaces/articleItem';
import { IArticle } from '../interfaces/article';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { ArticleStore } from '../stores/articleStore';
import { IDictionaryItemInt } from '../interfaces/dictionaryItem';

interface EditArticleProps {
    WidthPct: number,
    ArticleId: number,
    MaxWidth?: number,
    BackgroundColor?: string,
    BackgroundColorEnd?: string,
}

@observer
export default class EditArticle extends React.Component<EditArticleProps, any> {
    private articleStore: ArticleStore;

    constructor(props: EditArticleProps) {
        super(props);
        this.articleStore = new ArticleStore(this.props.ArticleId);
    }

    render() {
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
        
        // Logic for rendering the actual article
        const article = (props: RouteComponentProps<any>) =>
            {
                const onSaveArticle = () => {
                    const articleContent = (document.getElementById("EditArticleText") as HTMLTextAreaElement).value;
                    const category = (document.getElementById("CategoryInput") as HTMLInputElement).value;
                    const subcategory = (document.getElementById("SubcategoryInput") as HTMLInputElement).value;
                    const author = (document.getElementById("AuthorInput") as HTMLInputElement).value;
                    const subject = (document.getElementById("SubjectInput") as HTMLInputElement).value;
                    const level = +(document.getElementById("LevelInput") as HTMLInputElement).value;
                    const a: IArticle = this.buildArticle(subject, author, category, subcategory, level, articleContent);
                    
                    console.log(a);
                    this.articleStore.SaveArticle(a);
                };

                const a = this.articleStore.currentArticle;
                const contentTextarea = <Textarea InitialText={""}/>;//{this.articleItemsToString(a.ArticleItems)}/>;
                const saveButton = <Button Text={"Save"} OnClick={onSaveArticle} />;
                const categoryTextinput = <Textinput InitialText="" Label="Category" Id="CategoryInput"/>;
                const subcategoryTextinput = <Textinput InitialText="" Label="SubCategory" Id="SubcategoryInput"/>;
                const AuthorTextinput = <Textinput InitialText="" Label="Author" Id="AuthorInput"/>;
                const SubjectTextinput = <Textinput InitialText="" Label="Subject" Id="SubjectInput"/>;
                const LevelNumberInput = <Textinput InitialText="1" Label="Level" Id="LevelInput"/>;
                
                return (
                    <ArticleDiv>
                        <ArticleForm>
                            {categoryTextinput}
                            {subcategoryTextinput}
                            {AuthorTextinput}
                            {SubjectTextinput}
                            {LevelNumberInput}
                            {contentTextarea}
                            {saveButton}
                        </ArticleForm>
                    </ArticleDiv>);
            };

        return(            
            <Switch>
                <Route path='/admin/edit/:articleId' render={article} />
                <Route path='/admin/edit' render={article}/>
            </Switch>
        );
    }

    // Convert article items to a string that can be edited in a textarea field
    private articleItemsToString(items: IArticleItem[]): string {
        return items.map(i => i.Type == ArticleItemType.Code ? 
            "<Code>" + i.Content + "</Code>" 
            : "<Text>" + i.Content + "</Text>").join("");
    }    

    // Build an article from the input in the article form
    private buildArticle(subject: string, author: string, category: string, subcategory: string,
        level: number, content: string, id?: number): IArticle {
        
        var article: IArticle = {
            Id: id ? id : 0,
            Subject: subject,
            Author: author,
            Category: category,
            SubCategory: subcategory,
            Level: level,
            Created: new Date(),
            ArticleItems: this.createArticleItems(content)
        };

        return article;
    }

    // Build article items from the content string
    private createArticleItems(content: string): IArticleItem[] {
        const contentParts = content.split("</>");

        const items: IArticleItem[] = contentParts.map(c => {
            const type : number = ArticleItemTypeIdentifiers.find(t => t.value === c.substring(0,3)).key;
            if(type > 0){
                // If the type was found, then remove the type identifier (<c>, <t>, etc.) from the content string
                c = c.substring(3, c.length);
            }

            const item: IArticleItem = {
                Id: 0,
                Content: c,
                Type: type
            };
            return item;
        });

        return items;
    }
}