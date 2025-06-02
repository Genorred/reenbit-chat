import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'text';
    fullWidth?: boolean;
}

export  const buttonVariants = (variant: ButtonProps['variant']) => cn(
    'rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer',
    {
        'bg-foreground text-white hover:bg-foreground/90': variant === 'primary',
        'bg-secondary-background text-foreground hover:bg-secondary-background-accent hover:text-accent': variant === 'secondary',
        'text-foreground hover:bg-accent-background': variant === 'text',
    },
)
export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    fullWidth = false,
    ...props
}) => {
    return (
        <button
            className={cn(
                'rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer',
                {
                    'bg-foreground text-white hover:bg-foreground/90': variant === 'primary',
                    'bg-white border text-foreground hover:bg-secondary-background-accent hover:text-accent': variant === 'secondary',
                    'text-foreground hover:bg-accent-background': variant === 'text',
                    'w-full': fullWidth
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};