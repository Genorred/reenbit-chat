import React from 'react';
import {useToastStore} from '~/shared/lib/store/toastStore';
import {useMutation} from "@tanstack/react-query";
import {chatApi} from "~/shared/api/chat";
import {queryClient} from "~/shared/lib/queryClient";
import {ConfirmDialog} from "~/shared/ui/dialog/ConfirmDialog";
import {useNavigate} from "react-router";

interface DeleteChatDialogProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: {
        id: string;
        firstName: string;
        lastName: string;
    };
}

export const DeleteChatDialog: React.FC<DeleteChatDialogProps> = ({
                                                                      isOpen,
                                                                      onClose,
                                                                      initialData
                                                                  }) => {
    const {id, firstName, lastName} = initialData
    const addToast = useToastStore((state) => state.addToast);
    const navigate = useNavigate();
    const deleteChatMutation = useMutation({
        mutationFn: chatApi.deleteChat,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['chats']});
            navigate('/')
        },
        onError: () => {
            addToast({
                type: 'error',
                message: 'Failed to delete chat',
            });
        },
    });
    const handleDeleteChat = () => {
        deleteChatMutation.mutate(id);
    };
    return (
        <ConfirmDialog
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleDeleteChat}
            title="Delete Chat"
            message={`Are you sure you want to delete chat with ${firstName} ${lastName}?`}
            confirmText="Delete"
        />
    );
}; 