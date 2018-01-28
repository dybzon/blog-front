import * as React from 'react';
import styled from 'styled-components';
import { IArticle } from '../interfaces/article';
import Label from './label';

interface TextInputProps {
    Id: string;
    InitialText: string;
    Label: string;
    Tooltip?: string;
}

var Textinput = (props: TextInputProps) => {
    const TextinputInput = styled.input`
    `;

    const PContainer = styled.p`
        margin-top: 0px;
    `;

    return (
        <PContainer>
            <Label Text={props.Label}/>
            <TextinputInput defaultValue={props.InitialText} type={"text"} id={props.Id}/>
        </PContainer>
    );
}

export default Textinput;