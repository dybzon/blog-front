import * as React from 'react';
import styled from 'styled-components';
import { IMenuCategory, IMenuSubCategory } from '../interfaces/menu';
import { IArticleMeta } from '../interfaces/article';

interface MenuCategoryProps {
    MenuCategory: IMenuCategory;
    HandleOnClick: (id: number) => void;
}

const MenuCategory = (props: MenuCategoryProps) => {
    const MenuCategoryDiv = styled.div`
        width: 100%;
        margin: 0;
        border: none;
    `;

    const MenuArticleDiv = styled.div`
        height: 40px;
        width: 100%;
        margin: 0 auto;
        text-align: left;
        border-bottom: 1px solid #8B9EB2;
        background: #293949;

        .text {
            margin-left: 3px;
        }
    `;

    const OnClick: (event: React.MouseEvent<HTMLElement>) => void =
        (event: React.MouseEvent<HTMLElement>) => {
            const articleId: number = +event.currentTarget.id;
            console.log(articleId);
            props.HandleOnClick(articleId);
        }

    // Flatten everything for now (utilize the categorization later...)
    const articles = props.MenuCategory.SubCategories.map(ms => 
            ms.Articles.map(a => 
                (<MenuArticleDiv onClick={OnClick} id={a.Id.toString()} key={a.Id}>
                    <div className="text">{a.Subject}</div>
                </MenuArticleDiv>)));

    return (
        <MenuCategoryDiv>
            {articles}
        </MenuCategoryDiv>
    );
}

export default MenuCategory;