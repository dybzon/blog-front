import * as React from 'react';
import styled from 'styled-components';
import { IArticle } from '../interfaces/article';

interface ButtonProps {
    OnClick: () => void;
    Text: string;
    Tooltip?: string;
}

var Button = (props: ButtonProps) => {
    const ButtonInput = styled.input`
    
    `;

    return (
        <ButtonInput onClick={props.OnClick} value={props.Text} type={"submit"}/>
    );
}

export default Button;