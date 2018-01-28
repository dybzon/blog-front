import * as React from 'react';
import styled from 'styled-components';

interface LabelProps {
    Text: string;
    Tooltip?: string;
}

var Label = (props: LabelProps) => {
    const LabelLabel = styled.label`
        margin-right: 4px;
        padding: 0px;
        color: #AEB2B7;
    `;

    return (
        <LabelLabel>{props.Text}</LabelLabel>
    );
}

export default Label;