import React from 'react';

const Avatar = ({src, width, height}: {
    src?: string;
    alt?: string;
    width: number;
    height: number;
}) => {
    return (
        <img className='rounded-full'  src={src || '/defaultAvatar.svg'} alt={src} width={width} height={height} />
    );
};

export default Avatar;