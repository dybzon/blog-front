import * as React from 'react';
import styled from 'styled-components';

interface imageProps {
    src: string;
    alt: string;
    height: number;
    width: number;
}

const Image = (props: imageProps) => {
    const ImageElement = styled.img`
        // Any styling to add here at all?
    `;

    return (<ImageElement src={props.src} alt={props.alt} height={props.height} width={props.width} />);
}

export default Image;