import * as React from 'react';
// import styled from 'styled-components';
import * as CodeMirror from 'react-codemirror';
require('codemirror/mode/sql/sql');

interface CodeProps {
    Code: string;
    LineWrapping?: boolean;
    LineNumbers?: boolean;
    FirstLineNumber?: number;
    ReadOnly?: boolean;
    ViewportMargin?: number;
}

const defaultProps: CodeProps = {
    Code: '',
    LineWrapping: false,
    LineNumbers: true,
    FirstLineNumber: 1,
    ReadOnly: true,
    ViewportMargin: Infinity,
}

const Code = (props: CodeProps) => {
    const options: any = {
        lineNumbers: true,
        mode: 'text/x-mssql',
    };

    return (
        <CodeMirror value={props.Code} options={options} />
    );
}

export default Code;