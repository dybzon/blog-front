import * as React from 'react';
import styled from 'styled-components';
import { IMenuCategory, IMenuSubCategory } from '../interfaces/menu';
import { IArticleMeta } from '../interfaces/article';
import MenuSubCategory from './menuSubCategory';
import { Store } from '../stores/store';
import { observer } from 'mobx-react';
import { IDictionaryItem } from '../interfaces/dictionaryItem';
import iconMapping from '../helpers/iconMapping';

interface MenuCategoryProps {
    Category: IMenuCategory;
    Store: Store;    
}

const MenuCategory = observer((props: MenuCategoryProps) => {
    const MenuCategoryDiv = styled.div`
        p {
            margin: 0;
            position: relative;
            top: 50%;
            left: 2%;
            transform: translate(0%, -50%);                
        }

        width: 100%;
        height: 40px;
        margin: 0 auto;
        background: #415A72;
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

    const IconI = styled.i`
        margin: 0;
        position: relative;
        top: 50%;
        left: 90%;
        transform: translate(-50%, -50%);
    `;

    const subCategories = props.Category.IsActive ? props.Category.SubCategories.map(
        sc => (<MenuSubCategory Category={props.Category} SubCategory={sc} Store={props.Store} key={sc.SubCategory}/>))
        : null;

    const OnClick = () => {
        props.Store.SetMenuCategoryState(props.Category, !props.Category.IsActive)
    };

    var iconClass: IDictionaryItem = iconMapping.find(i => i.key === props.Category.Category);
    iconClass = iconClass ? iconClass : iconMapping.find(i => i.key === 'CategoryDefault');

    return (
        <MenuCategoryContainerDiv>
            <MenuCategoryDiv onClick={OnClick}>
                <p>{props.Category.Category}</p>
                <IconI className={iconClass.name} aria-hidden="true" />
            </MenuCategoryDiv>
            {subCategories}
        </MenuCategoryContainerDiv>
    );
});

export default MenuCategory;