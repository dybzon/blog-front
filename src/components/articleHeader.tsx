import * as React from 'react';
import styled from 'styled-components';

interface ArticleHeaderProps {
    Subject: string;
}

const ArticleHeader = (props: any) => {
    const HeaderH = styled.h1`
        display: inline-block;
        color: #AEB2B7;
    `;

    return(
        <HeaderH>
            {props.Subject}
        </HeaderH>
    );
}

export default ArticleHeader;