import * as React from 'react';
import styled from 'styled-components';

export interface ContainerProps {
    WidthPct: number,
    MaxWidth?: number,
    BackgroundColor?: string,
    BackgroundColorEnd?: string,
    children: any,
};


const Container = (props: ContainerProps) => {
    const ContainerDiv = styled.div`
        min-height: 100vh;
        width: ${props.WidthPct}vw;
        max-width: ${props.MaxWidth ? props.MaxWidth : window.innerWidth}px;
        margin: 0 auto;
        ${props.BackgroundColor ? ("background: linear-gradient(" + props.BackgroundColor + "," + (props.BackgroundColorEnd ? props.BackgroundColorEnd : props.BackgroundColor)+ ");") : "none"}
    `;

    return(
        <ContainerDiv>
            {props.children}
        </ContainerDiv>
    );
};

export default Container;