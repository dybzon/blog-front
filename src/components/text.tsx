import * as React from 'react';
import styled from 'styled-components';

interface TextProps {
    Text: string,
}

const Text = (props: TextProps) => {
    const TextElement = styled.div`
        background: none;
        width: 100%;
        padding: 2px 4px;
        margin-bottom: 4px;
        color: #AEB2B7;
    `;

    return (
        <TextElement>
            {props.Text}
        </TextElement>
    );
}

export default Text;