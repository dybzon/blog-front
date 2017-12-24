import * as React from 'react';
import styled from 'styled-components';

interface ItemProps {
    ColorStart: string,
    ColorEnd: string,
    Title?: string,
    Description?: string,
    Position: number,
}

const Item = (props: ItemProps) => {
    const ItemElement = styled.div`
        background: linear-gradient(${props.ColorStart}, ${props.ColorEnd});
        width: 100%;
        height: 30px;
        margin: 0px;
        border: none;
    `;

    return (
        <ItemElement>
            <h1>{props.Title}</h1>
            <p>{props.Description}</p>
        </ItemElement>
    );
}

export default Item;