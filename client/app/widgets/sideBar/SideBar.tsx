import React, { useState } from 'react';
import NavBar from "~/widgets/sideBar/NavBar";
import {Outlet, useParams} from "react-router";
import Search from "~/features/chat/ui/Search";
import Chat from "~/features/chat/ui/Chat";
import { CreateChatDialog } from '~/features/chat/ui/CreateChatDialog';
import { Button } from '~/shared/ui/Button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatApi } from '~/shared/api/chat';
import { useToastStore } from '~/shared/lib/store/toastStore';
import useWebSocket from "react-use-websocket";
import type {ServerMessage} from "~/features/message/model/ServerMessage";
import {useAutoMessageStore} from "~/features/message/model/autoMessageStore";

const SideBar = () => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const { data: chats = [] } = useQuery({
        queryKey: ['chats'],
        queryFn: chatApi.getChats,
    });

    const addToast = useToastStore((state) => state.addToast);
    const isAutoMessaging = useAutoMessageStore(state => state.isEnabled);
    const url = new URL(import.meta.env.VITE_WS_API_URL + '/auto-chat' as string);
    useWebSocket<ServerMessage>(url.href, {
        shouldReconnect: event => event.type === "CONNECT",
        onMessage: (event) => {
            const data = JSON.parse(event.data);
            addToast({
                type: "info",
                message: `You got a message from ${data.firstName} ${data.lastName}`,
            })
        }
    }, isAutoMessaging);
    return (
        <div className='flex h-screen'>
            <section className='w-full max-w-[640px] flex flex-col h-screen border'>
                <section className='bg-secondary-background border-b'>
                    <NavBar/>
                    <Search />
                </section>
                <section className='px-4 py-8 grow overflow-y-auto'>
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
            />
        </div>
    );
};

export default SideBar;