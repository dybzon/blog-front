import * as React from 'react';
import styled from 'styled-components';

interface ArticleFooterProps {
    Author: string;
    Created: Date;
    Level: number;
}

const ArticleFooter = (props: ArticleFooterProps) => {
    const ArticleFooterP = styled.p`
        font-size: 10px;
        display: inline-block;
        margin-top: 20px;
        color: #AEB2B7;
        padding: 2px 4px;
    `;

    const createDate = new Date(props.Created);

    return (
        <ArticleFooterP>
            By {props.Author} on {createDate.getUTCFullYear()}-{createDate.getUTCMonth()+1}-{createDate.getUTCDate()}
        </ArticleFooterP>
    );
}

export default ArticleFooter;