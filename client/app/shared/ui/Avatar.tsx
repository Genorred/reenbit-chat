import React from 'react';
import Img from "react-optimized-image";
import type {ImgProps} from "react-optimized-image/lib/components/Img";

const Avatar = (props: ImgProps) => {
    return (
        <Img {...props} />
    );
};

export default Avatar;