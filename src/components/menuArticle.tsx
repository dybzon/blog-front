import * as React from 'react';
import styled from 'styled-components';
import { IArticleMeta } from '../interfaces/article';

interface MenuArticleProps {
    Article: IArticleMeta;
    HandleOnClick: (id: number) => void;
}

const MenuArticle = (props: MenuArticleProps) => {
    const MenuArticleDiv = styled.div`
        height: 40px;
        width: 100%;
        margin: 0 auto;
        text-align: left;
        border-bottom: 1px solid #8B9EB2;
        background: #293949;
        
        :hover {
            cursor: pointer;
            color: #3AC9B0;
        }
        
        .text {
            margin-left: 3px;
        }
    `;

    const OnClick: (event: React.MouseEvent<HTMLElement>) => void =
    (event: React.MouseEvent<HTMLElement>) => {
        const articleId: number = props.Article.Id; //+event.currentTarget.id;
        console.log(articleId);
        props.HandleOnClick(articleId);
    }

    return (
        <MenuArticleDiv onClick={OnClick} id={props.Article.Id.toString()}>
            {props.Article.Subject}
        </MenuArticleDiv>
    );
}

export default MenuArticle;