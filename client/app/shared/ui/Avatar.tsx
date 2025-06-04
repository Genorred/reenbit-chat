import React from 'react';
import {cn} from "~/shared/utils/cn";

const Avatar = ({src, width, height, alt, className}: {
    src?: string;
    alt?: string;
    width: number;
    height: number;
    className?: string;
}) => {
    return (
        <img className={cn('rounded-full', className)} src={src || '/defaultAvatar.svg'} alt={alt} width={width}
             height={height}/>
    );
};

export default Avatar;