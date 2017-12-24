import * as React from 'react';
import styled from 'styled-components';

interface ArticleProps {
    WidthPct: number,
    MaxWidth?: number,
    BackgroundColor?: string,
    BackgroundColorEnd?: string,
    children: any,
}

export default class Code extends React.Component<ArticleProps, any> {
    render() {
        const ArticleDiv = styled.div`
            min-height: 100vh;
            width: ${this.props.WidthPct}vw;
            max-width: ${this.props.MaxWidth ? this.props.MaxWidth : window.innerWidth}px;
            margin: 0 auto;
            ${this.props.BackgroundColor ? 
                ("background: linear-gradient(" + this.props.BackgroundColor + " 20%," 
                    + (this.props.BackgroundColorEnd ? 
                        this.props.BackgroundColorEnd 
                        : this.props.BackgroundColor)+ " 80%);") 
                : "none"}
        `;

        return(
            <ArticleDiv>
                {this.props.children}
            </ArticleDiv>
        );
    }
}