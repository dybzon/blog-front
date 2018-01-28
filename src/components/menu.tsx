import * as React from 'react';
import styled from 'styled-components';
import { IMenuCategory } from '../interfaces/menu';
import MenuCategory from '../components/menuCategory';
import MenuEditArticle from '../components/menuEditArticle';
import { MenuStore } from '../stores/menuStore';
import { observer } from 'mobx-react';

export interface MenuProps {
    MenuCategories?: IMenuCategory[];
    MenuStore: MenuStore;
}

@observer
export default class Menu extends React.Component<MenuProps> {
    // menuStore: MenuStore;
    // constructor(props: any) {
    //     super(props);
    //     this.menuStore = new MenuStore();
    // }
        
    render() {
        const MenuDiv = styled.div`
            position: fixed;
            left: 0px;
            width: 15%;
            background: none;
            margin: 0;
            padding: 0;
            color: #AEB2B7;
            min-height: 100vh;
            // border: 1px solid #AEB2B7;

            -webkit-box-shadow: 0px 0px 50px 5px rgba(174,178,183,0.2);
            -moz-box-shadow: 0px 0px 50px 5px rgba(174,178,183,0.2);
            box-shadow: 0px 0px 50px 5px rgba(174,178,183,0.2);


            // Overwrite react-router link styling
            a {
                text-decoration: none;
                color: #AEB2B7;
            }                
        `;

        // Article categories for the menu
        const categories = this.props.MenuStore.menuCategories.map((m, i) =>
            (<MenuCategory Category={m} MenuStore={this.props.MenuStore} key={i} />));

        // Menu link to admin page
        const adminLink = (<MenuEditArticle/>);

        // Add an admin action to the category.

        return (
            <MenuDiv>
                {adminLink}
                {categories}
            </MenuDiv>
        );
    }
}