import * as React from 'react';
import styled from 'styled-components';
import { IArticleMeta } from '../interfaces/article';
import { Store } from '../stores/store';
import { IDictionaryItem } from '../interfaces/dictionaryItem';
import iconMapping from '../helpers/iconMapping';

interface MenuArticleProps {
    Article: IArticleMeta;
    Store: Store;
}

const MenuArticle = (props: MenuArticleProps) => {
    const MenuArticleDiv = styled.div`
        p {
            margin: 0;
            position: relative;
            top: 50%;
            left: 2%;
            transform: translate(0%, -50%);                
        }

        height: 40px;
        width: 100%;
        margin: 0 auto;
        text-align: left;
        border-bottom: 1px solid #8B9EB2;
        background: #577896;
        
        :hover {
            cursor: pointer;
            color: #3AC9B0;
        }
        
        .text {
            margin-left: 3px;
        }
    `;

    const IconI = styled.i`
        margin: 0;
        position: relative;
        top: 50%;
        left: 90%;
        transform: translate(-50%, -50%);
    `;

    var iconClass: IDictionaryItem = iconMapping.find(i => i.key === props.Article.Subject);
    iconClass = iconClass ? iconClass : iconMapping.find(i => i.key === 'ArticleDefault');

    const OnClick: (event: React.MouseEvent<HTMLElement>) => void =
    (event: React.MouseEvent<HTMLElement>) => {
        const articleId: number = props.Article.Id;
        props.Store.SetArticle(articleId);
    }

    return (
        <MenuArticleDiv onClick={OnClick} id={props.Article.Id.toString()}>
            <p>{props.Article.Subject}</p>
            <IconI className={iconClass.name} aria-hidden="true" />
        </MenuArticleDiv>
    );
}

export default MenuArticle;