import * as React from 'react';
import styled from 'styled-components';
import { IMenuCategory } from '../interfaces/menu';
import MenuCategory from '../components/menuCategory';
import { Store } from '../stores/store';
import { observer } from 'mobx-react';

export interface MenuProps {
    MenuCategories: IMenuCategory[];
    Store: Store;
}

@observer
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

        const categories = this.props.MenuCategories.map((m, i) =>
            (<MenuCategory Category={m} Store={this.props.Store} key={i} />));

        return (
            <MenuDiv>
                {categories}
            </MenuDiv>
        );
    }
}