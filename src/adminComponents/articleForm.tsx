import * as React from 'react';
import styled from 'styled-components';

export default class ArticleForm extends React.Component {
    render() {
        const FormDiv = styled.form`
            width: 100%;
        `;

        return(
            <FormDiv>{this.props.children}</FormDiv>
        );
    }
}
