import React, {useEffect, useRef} from 'react';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({isOpen, onClose, title, children}) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div ref={dialogRef} className="bg-background p-6 rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-foreground">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-foreground hover:text-foreground/80"
                    >
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}; 