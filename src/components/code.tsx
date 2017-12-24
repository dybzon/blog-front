import * as React from 'react';
import styled from 'styled-components';

interface CodeProps {
    Code: string,
}

interface SpanElement {
    FontColor: string,
    Text: string,
}

// Take the code string and parse it into a collection of span elements
const codeFormatter = (code: string) : SpanElement[] => {
    var result : SpanElement[] = [];

    var blueReservedWords : string[] = [
        "ADD", "EXTERNAL", "PROCEDURE", "FETCH", "PUBLIC", "ALTER", "FILE", "RAISERROR", "FILLFACTOR", "READ",
        "FOR", "READTEXT", "AS", "FOREIGN", "RECONFIGURE", "ASC", "FREETEXT", "REFERENCES", "WRITETEXT", "EXIT", "PROC",
        "AUTHORIZATION", "FREETEXTTABLE", "REPLICATION", "BACKUP", "FROM", "RESTORE", "BEGIN", "FULL", "RESTRICT",
        "FUNCTION", "RETURN", "BREAK", "GOTO", "REVERT", "BROWSE", "GRANT", "REVOKE", "BULK", "GROUP", "BY", "HAVING", "ROLLBACK",
        "CASCADE", "HOLDLOCK", "ROWCOUNT", "CASE", "IDENTITY", "ROWGUIDCOL", "CHECK", "IDENTITY_INSERT", "RULE",
        "CHECKPOINT", "IDENTITYCOL", "SAVE", "CLOSE", "IF", "SCHEMA", "CLUSTERED", "SECURITYAUDIT", "INDEX", "SELECT",
        "SEMANTICKEYPHRASETABLE", "COLUMN", "INSERT", "SEMANTICSIMILARITYDETAILSTABLE", "COMMIT", "INTERSECT", "SEMANTICSIMILARITYTABLE",
        "COMPUTE", "INTO", "CONSTRAINT", "SET", "SETUSER", "CONTAINSTABLE", "KEY", "SHUTDOWN", "CONTINUE", "KILL", "STATISTICS",
        "CREATE", "LINENO", "TABLE", "CURRENT", "LOAD", "TABLESAMPLE", "CURRENT_DATE", "MERGE", "TEXTSIZE", "NATIONAL", "THEN",
        "NOCHECK", "TO", "NONCLUSTERED", "TOP", "CURSOR", "TRAN", "DATABASE", "TRANSACTION", "DBCC", "TRIGGER", "DEALLOCATE", "OF", 
        "TRUNCATE", "DECLARE", "OFF", "DEFAULT", "OFFSETS", "DELETE", "ON", "UNION", "DENY", "OPEN", "UNIQUE", "DESC", "OPENDATASOURCE",
        "DISK", "OPENQUERY", "DISTINCT", "OPENROWSET", "UPDATETEXT", "DISTRIBUTED", "OPENXML", "USE", "DOUBLE", "OPTION", "USER",
        "DROP", "VALUES", "DUMP", "ORDER", "VARYING", "ELSE", "VIEW", "END", "OVER", "WAITFOR", "ERRLVL", "PERCENT", "WHEN",
        "ESCAPE", "WHERE", "EXCEPT", "PLAN", "WHILE", "EXEC", "PRECISION", "WITH", "EXECUTE", "PRIMARY", "WITHIN GROUP", "PRINT",
    ];
    var purpleReservedWords : string[] = [
        "NULLIF", "TRY_CONVERT", "TSEQUAL", "UPDATE", "CURRENT_USER", "CURRENT_TIMESTAMP", "CURRENT_TIME", "CONVERT", "SYSTEM_USER",
        "SESSION_USER", "CONTAINS", "COLLATE", "COALESCE", "LEN",
    ];
    var grayReservedWords : string[] = [
        "SOME", "ALL", "PIVOT", "EXISTS", "UNPIVOT", "OR", "OUTER", "CROSS", "LEFT", "LIKE", "NOT", "NULL", 
        "RIGHT", "IN", "INNER", "IS", "JOIN", "AND", "ANY", "BETWEEN",
    ];
    var redDelimiters : string[] = [
        "'",
    ];
    var blackDelimiters : string[] = [
        "(", ")", ",", "\s", "\t", "\n", "\r", "=",
    ];
    // var allDelimiters : string[] = [];
    // allDelimiters.push(...redDelimiters);
    // allDelimiters.push(...blackDelimiters);

    var splitStrings : string[] = code.split(/([(),\s\t\n\r'=])/g); // Regex to split on all delimiters, and keep delimiters too

    var getElementType : (element: string) => string = (element: string) => {
        if(blackDelimiters.indexOf(element) !== -1) {
            return "blackdelimiter";
        }
        if(redDelimiters.indexOf(element) !== -1) {
            return "reddelimiter";
        }
        if(blueReservedWords.indexOf(element) !== -1) {
            return "blueword";
        }
        if(purpleReservedWords.indexOf(element) !== -1) {
            return "purpleword";
        }
        if(grayReservedWords.indexOf(element) !== -1) {
            return "grayword";
        }
        return "regular";
    }

    var getElementColor : (element: string) => string = (element: string) => {
        if(blackDelimiters.indexOf(element) !== -1) {
            return "black";
        }
        if(redDelimiters.indexOf(element) !== -1) {
            return "#FF4730";
        }
        if(blueReservedWords.indexOf(element) !== -1) {
            return "#4742FF";
        }
        if(purpleReservedWords.indexOf(element) !== -1) {
            return "#FF41FF";
        }
        if(grayReservedWords.indexOf(element) !== -1) {
            return "#8F868A";
        }
        return "black";        
    }

    var currentSpanContent : string = "";
    var currentSpanType : string = "";
    var currentSpanColor : string = "";
    splitStrings.forEach(element => {
        var newElementType = getElementType(element);
        var newElementColor = getElementColor(element);
        // If the current span is empty, then simply add the element to it
        if(currentSpanContent === ""){
            currentSpanContent = element;
        }
        // If the current span contains something, then assert whether we should add the next element to the same span
        else{
            if(currentSpanType === "reddelimiter"){ //If we're in a string '', then 
                currentSpanContent = currentSpanContent.concat(element);
                newElementColor = currentSpanColor;
            }
            if(currentSpanType === getElementType(element)) { // Elements are of same type and can be included in one span
                currentSpanContent = currentSpanContent.concat(element);
            }
            else{ // Create a new span element from the current content
                var span : SpanElement = { FontColor: currentSpanColor, Text: currentSpanContent};
                result.push(span);
                
                // Add the current element to the content instead
                currentSpanContent = element;
            }
        }
        currentSpanType = newElementType;
        currentSpanColor = newElementColor;
    });

    // Push the last element
    var span : SpanElement = { FontColor: currentSpanColor, Text: currentSpanContent};
    result.push(span);

    return result;
}

const Code = (props: CodeProps) => {
    const CodeElement = styled.div`
        background: white;
        width: 100%;
        padding: 5px 5px;
        box-shadow: 2px 2px inset;
        margin-bottom: 4px;
        white-space: pre-wrap;
        font-family: monospace;
    `;

    var spanElements = codeFormatter(props.Code).map((se, i) => (<span style={{color: se.FontColor}} key={i}>{se.Text}</span>));
    return (
        <CodeElement>
            {spanElements}
        </CodeElement>
    );
}

export default Code;