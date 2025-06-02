import React, { useState } from 'react';
import { Dialog } from '~/shared/ui/dialog/Dialog';
import { Input } from '~/shared/ui/Input';
import { Button } from '~/shared/ui/Button';

interface CreateChatDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (firstName: string, lastName: string) => void;
}

export const CreateChatDialog: React.FC<CreateChatDialogProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(firstName, lastName);
        setFirstName('');
        setLastName('');
        onClose();
    };

    return (
        <Dialog isOpen={isOpen} onClose={onClose} title="Create New Chat">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <Button type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Create
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}; 