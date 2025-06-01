import React, {type InputHTMLAttributes} from 'react';
import {cn} from "../utils/cn";

const Input = ({className, ...props}: InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input className={cn('bg-stone-50 rounded-md text-xl px-4 py-2')} {...props}/>
    );
};

export default Input;