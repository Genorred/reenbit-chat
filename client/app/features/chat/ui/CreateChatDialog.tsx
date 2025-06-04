import React, {useState} from 'react';
import {Dialog} from '~/shared/ui/dialog/Dialog';
import {Input} from '~/shared/ui/Input';
import {Button} from '~/shared/ui/Button';
import {useToastStore} from '~/shared/lib/store/toastStore';
import {useMutation} from "@tanstack/react-query";
import {chatApi} from "~/shared/api/chat";
import {queryClient} from "~/shared/lib/queryClient";

interface CreateChatDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateChatDialog: React.FC<CreateChatDialogProps> = ({
                                                                      isOpen,
                                                                      onClose,
                                                                  }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const addToast = useToastStore((state) => state.addToast);
    const createChatMutation = useMutation({
        mutationFn: chatApi.createChat,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['chats']});
        },
        onError: () => {
            addToast({
                type: 'error',
                message: 'Failed to create chat',
            });
        },
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createChatMutation.mutate({firstName, lastName});
        addToast({
            type: 'success',
            message: `Chat with ${firstName} ${lastName} created successfully`,
        });
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