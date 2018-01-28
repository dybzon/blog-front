import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IDictionaryItem } from '../interfaces/dictionaryItem';
import iconMapping from '../helpers/iconMapping';

interface MenuEditArticleProps {
}

const MenuEditArticle = (props: MenuEditArticleProps) => {
    const MenuEditArticleDiv = styled.div`
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

    const IconI = styled.i`
        margin: 0;
        position: relative;
        top: 50%;
        left: 90%;
        transform: translate(-50%, -50%);
    `;

    const iconClass: IDictionaryItem = iconMapping.find(i => i.key === 'Edit');

    return (
        <Link to={'/admin/edit/'}>
            <MenuEditArticleDiv>
                <p>Edit articles</p>
                <IconI className={iconClass.value} aria-hidden="true" />
            </MenuEditArticleDiv>
        </Link>
    );
}

export default MenuEditArticle;