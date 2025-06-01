import React, {type ButtonHTMLAttributes} from 'react';
import {cn} from "../utils/cn";

const Button = ({className, ...props}:  ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button className={cn('w-8 h-4', className)} {...props} />
    );
};

export default Button;