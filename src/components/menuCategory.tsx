import * as React from 'react';
import styled from 'styled-components';
import { IMenuCategory, IMenuSubCategory } from '../interfaces/menu';
import { IArticleMeta } from '../interfaces/article';
import MenuSubCategory from './menuSubCategory';

interface MenuCategoryProps {
    Category: IMenuCategory;
    HandleOnClick: (id: number) => void;
}

const MenuCategory = (props: MenuCategoryProps) => {
    const MenuCategoryDiv = styled.div`
        width: 100%;
        height: 40px;
        margin: 0 auto;
        text-align: left;
        background: #293949;        
        border-bottom: 1px solid #8B9EB2;

        :hover {
            cursor: pointer;
            color: #3AC9B0;
        }
        
        .text {
            margin-left: 3px;
        }    
    `;

    const MenuCategoryContainerDiv = styled.div`
        width: 100%;
        margin: 0;
        border: none;
    `;

    const subCategories = props.Category.SubCategories.map(
        sc => (<MenuSubCategory Category={props.Category} SubCategory={sc} HandleOnClick={props.HandleOnClick} key={sc.SubCategory}/>)
    );

    return (
        <MenuCategoryContainerDiv>
            <MenuCategoryDiv>{props.Category.Category}</MenuCategoryDiv>
            {subCategories}
        </MenuCategoryContainerDiv>
    );
}

export default MenuCategory;