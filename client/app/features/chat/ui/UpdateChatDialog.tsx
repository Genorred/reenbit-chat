import React, {useEffect, useState} from 'react';
import {Dialog} from '~/shared/ui/dialog/Dialog';
import {Input} from '~/shared/ui/Input';
import {Button} from '~/shared/ui/Button';
import {useToastStore} from '~/shared/lib/store/toastStore';
import {useMutation} from "@tanstack/react-query";
import {chatApi} from "~/shared/api/chat";
import {queryClient} from "~/shared/lib/queryClient";

interface UpdateChatDialogProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: {
        id: string;
        firstName: string;
        lastName: string;
    };
}

export const UpdateChatDialog: React.FC<UpdateChatDialogProps> = ({
                                                                      isOpen,
                                                                      onClose,
                                                                      initialData,
                                                                  }) => {
    const [firstName, setFirstName] = useState(initialData.firstName);
    const [lastName, setLastName] = useState(initialData.lastName);
    const addToast = useToastStore((state) => state.addToast);

    useEffect(() => {
        setFirstName(initialData.firstName);
        setLastName(initialData.lastName);
    }, [initialData]);

    const updateChatMutation = useMutation({
        mutationFn: (data: { id: string; firstName: string; lastName: string }) =>
            chatApi.updateChat(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['chats']});
        },
        onError: () => {
            addToast({
                type: 'error',
                message: 'Failed to update chat',
            });
        },
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateChatMutation.mutate({id: initialData.id, firstName, lastName});
        addToast({
            type: 'success',
            message: `Chat with ${firstName} ${lastName} updated successfully`,
        });
        onClose();
    };

    return (
        <Dialog isOpen={isOpen} onClose={onClose} title="Update Chat">
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
                        Update
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}; 