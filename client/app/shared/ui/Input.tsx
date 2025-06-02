import React from 'react';
import { cn } from '../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    className,
    label,
    error,
    ...props
}) => {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-foreground">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    'block w-full rounded-md border border-secondary-background-accent bg-background px-3 py-2 text-sm',
                    'focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground',
                    {
                        'border-red-500 focus:border-red-500 focus:ring-red-500': error
                    },
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};