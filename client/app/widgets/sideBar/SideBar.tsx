import React, { useState } from 'react';
import NavBar from "~/widgets/sideBar/NavBar";
import {Outlet} from "react-router";
import Search from "~/features/chat/ui/Search";
import Chat from "~/features/chat/ui/Chat";
import { CreateChatDialog } from '~/features/chat/ui/CreateChatDialog';
import { Button } from '~/shared/ui/Button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatApi } from '~/shared/api/chat';
import { useToastStore } from '~/shared/lib/store/toastStore';

const SideBar = () => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const queryClient = useQueryClient();
    const addToast = useToastStore((state) => state.addToast);

    const { data: chats = [] } = useQuery({
        queryKey: ['chats'],
        queryFn: chatApi.getChats,
    });

    const createChatMutation = useMutation({
        mutationFn: chatApi.createChat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chats'] });
            addToast({
                type: 'success',
                message: 'Chat created successfully',
            });
        },
        onError: () => {
            addToast({
                type: 'error',
                message: 'Failed to create chat',
            });
        },
    });

    const updateChatMutation = useMutation({
        mutationFn: (data: { id: string; firstName: string; lastName: string  }) =>
            chatApi.updateChat(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chats'] });
            addToast({
                type: 'success',
                message: 'Chat updated successfully',
            });
        },
        onError: () => {
            addToast({
                type: 'error',
                message: 'Failed to update chat',
            });
        },
    });

    const deleteChatMutation = useMutation({
        mutationFn: chatApi.deleteChat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chats'] });
            addToast({
                type: 'success',
                message: 'Chat deleted successfully',
            });
        },
        onError: () => {
            addToast({
                type: 'error',
                message: 'Failed to delete chat',
            });
        },
    });

    const handleCreateChat = (firstName: string, lastName: string) => {
        createChatMutation.mutate({ firstName, lastName });
    };

    const handleEditChat = ( id: string, firstName: string, lastName: string  ) => {
        // TODO: Implement edit dialog
        updateChatMutation.mutate({id, firstName, lastName });
        console.log('Edit chat:', id);
    };

    const handleDeleteChat = (id: string) => {
        deleteChatMutation.mutate(id);
    };

    return (
        <div className='flex h-screen'>
            <section className='w-full max-w-[640px] h-full border'>
                <section className='bg-secondary-background border-b'>
                    <NavBar/>
                    <Search />
                </section>
                <section className='px-4 py-8'>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className='text-foreground'>
                            Chats
                        </h1>
                        <Button onClick={() => setIsCreateDialogOpen(true)}>
                            New Chat
                        </Button>
                    </div>
                    {chats.map((chat) => (
                        <Chat
                            key={chat._id}
                            id={chat._id}
                            firstName={chat.firstName}
                            lastName={chat.lastName}
                            onEdit={handleEditChat}
                            onDelete={handleDeleteChat}
                        />
                    ))}
                </section>
            </section>
            <section className='h-full grow'>
                <Outlet />
            </section>
            <CreateChatDialog
                isOpen={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onSubmit={handleCreateChat}
            />
        </div>
    );
};

export default SideBar;