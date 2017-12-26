import * as React from 'react';
import styled from 'styled-components';
import { IMenuCategory, IMenuSubCategory } from '../interfaces/menu';
import MenuArticle from './menuArticle';

interface MenuSubCategoryProps {
    Category: IMenuCategory;
    SubCategory: IMenuSubCategory;
    HandleOnClick: (id: number) => void;    
}

const MenuSubCategory = (props: MenuSubCategoryProps) => {
    const SubCategoryDiv = styled.div`
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

    const SubCategoryContainerDiv = styled.div`
        width: 100%;
        margin: 0 auto;
        text-align: left;
        background: #293949;        
    `;

    // Flatten everything for now (utilize the categorization later...)
    const articles = props.SubCategory.Articles.map(a => 
            (<MenuArticle HandleOnClick={props.HandleOnClick} Article={a} key={a.Id}/>));

    return (
        <SubCategoryContainerDiv>
            <SubCategoryDiv>{props.SubCategory.SubCategory}</SubCategoryDiv>
            {articles}            
        </SubCategoryContainerDiv>
    );
};

export default MenuSubCategory;