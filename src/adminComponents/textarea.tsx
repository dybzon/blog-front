import * as React from 'react';
import styled from 'styled-components';

interface TextareaProps {
    InitialText: string;
    Tooltip?: string;
}

var Textarea = (props: TextareaProps) => {
    const TextareaInput = styled.textarea`
        width: 100%;
        min-height: 50vh;
        margin-top: 8px;
        margin-bottom: 8px;
        padding: 4px;
    `;

    return (
        <TextareaInput id="EditArticleText" defaultValue={props.InitialText}/>
    );
}

export default Textarea;