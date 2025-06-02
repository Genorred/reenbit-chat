import React from 'react';
import Img from "react-optimized-image";

const Avatar = ({src, width, height}: {
    src?: string;
    width: number;
    height: number;
}) => {
    return (
        <Img src={{
            src: src || '/defaultAvatar.svg',
            width,
            height,
            format: 'webp'
        }} />
    );
};

export default Avatar;