import * as React from 'react';
import styled from 'styled-components';
import { IMenuCategory } from '../interfaces/menu';
import MenuCategory from '../components/menuCategory';
import { Store } from '../stores/store';

export interface MenuProps {
    MenuCategories: IMenuCategory[];
    Store: Store;
}

export default class Menu extends React.Component<MenuProps> {
    render() {
        const MenuDiv = styled.div`
            position: fixed;
            left: 0px;
            width: 15%;
            background: none;
            margin: 0;
            padding: 0;
            color: #AEB2B7;
        `;

        const onClick = this.props.Store.SetArticle.bind(this.props.Store);
        const categories = this.props.MenuCategories.map((m, i) =>
            (<MenuCategory MenuCategory={m} HandleOnClick={onClick} key={i} />));

        return (
            <MenuDiv>
                {categories}
            </MenuDiv>
        );
    }
}