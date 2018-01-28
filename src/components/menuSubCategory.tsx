import * as React from 'react';
import styled from 'styled-components';
import { IMenuCategory, IMenuSubCategory } from '../interfaces/menu';
import MenuArticle from './menuArticle';
import { MenuStore } from '../stores/menuStore';
import { observer } from 'mobx-react';
import { IDictionaryItem } from '../interfaces/dictionaryItem';
import iconMapping from '../helpers/iconMapping';

interface MenuSubCategoryProps {
    Category: IMenuCategory;
    SubCategory: IMenuSubCategory;
    MenuStore: MenuStore;
}

const MenuSubCategory = observer((props: MenuSubCategoryProps) => {
    const SubCategoryDiv = styled.div`
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
        background: #4B6882;
        
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
    `;

    const IconI = styled.i`
        margin: 0;
        position: relative;
        top: 50%;
        left: 90%;
        transform: translate(-50%, -50%);
    `;

    var iconClass: IDictionaryItem = iconMapping.find(i => i.key === props.SubCategory.SubCategory);
    iconClass = iconClass ? iconClass : iconMapping.find(i => i.key === 'SubCategoryDefault');

    // Get articles for the subcategory
    const articles = props.SubCategory.IsActive ? props.SubCategory.Articles.map(a => 
            (<MenuArticle Article={a} key={a.Id}/>))
            : null;

    const OnClick = () => {
        props.MenuStore.SetMenuSubCategoryState(props.Category, props.SubCategory, !props.SubCategory.IsActive)
    };
                    
    return (
        <SubCategoryContainerDiv>
            <SubCategoryDiv onClick={OnClick}>
                <p>{props.SubCategory.SubCategory}</p>
                <IconI className={iconClass.value} aria-hidden="true" />
            </SubCategoryDiv>
            {articles}            
        </SubCategoryContainerDiv>
    );
});

export default MenuSubCategory;