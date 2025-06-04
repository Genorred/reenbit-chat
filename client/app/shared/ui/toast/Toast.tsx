import React from 'react';
import type {Toast as ToastType} from '~/shared/lib/store/toastStore';
import {IoMdClose} from 'react-icons/io';

interface ToastProps {
    toast: ToastType;
    onClose: () => void;
}

const getToastStyles = (type: ToastType['type']) => {
    const baseStyles = 'p-4 rounded-lg shadow-lg flex items-center justify-between min-w-[300px]';
    const typeStyles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
        warning: 'bg-yellow-500 text-white',
    };
    return `${baseStyles} ${typeStyles[type]}`;
};

export const Toast: React.FC<ToastProps> = ({toast, onClose}) => {
    return (
        <div className={getToastStyles(toast.type)}>
            <span>{toast.message}</span>
            <button
                onClick={onClose}
                className="ml-4 hover:opacity-80 transition-opacity"
            >
                <IoMdClose className="w-5 h-5"/>
            </button>
        </div>
    );
}; 