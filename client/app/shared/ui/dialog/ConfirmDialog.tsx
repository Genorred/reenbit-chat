import React from 'react';
import {Dialog} from './Dialog';
import {Button} from '../Button';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
                                                                isOpen,
                                                                onClose,
                                                                onConfirm,
                                                                title,
                                                                message,
                                                                confirmText = 'Confirm',
                                                                cancelText = 'Cancel',
                                                            }) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose} title={title}>
            <div className="space-y-4">
                <p className="text-foreground">{message}</p>
                <div className="flex justify-end space-x-2">
                    <Button type="button" onClick={onClose}>
                        {cancelText}
                    </Button>
                    <Button
                        type="button"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="bg-red-500 hover:bg-red-600"
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}; 