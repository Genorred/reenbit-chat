import React, { useState } from 'react';
import NavBar from "~/widgets/sideBar/NavBar";
import {Outlet} from "react-router";
import {Input} from "~/shared/ui/Input";
import {Button} from "~/shared/ui/Button";
import Search from "~/features/chat/ui/Search";
import Chat from "~/features/chat/ui/Chat";
import { CreateChatDialog } from '~/features/chat/ui/CreateChatDialog';

const SideBar = () => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [chats, setChats] = useState<Array<{id: string; firstName: string; lastName: string}>>([]);

    const handleCreateChat = (firstName: string, lastName: string) => {
        const newChat = {
            id: Date.now().toString(),
            firstName,
            lastName,
        };
        setChats([...chats, newChat]);
    };

    const handleEditChat = (id: string) => {
        // TODO: Implement edit functionality
        console.log('Edit chat:', id);
    };

    const handleDeleteChat = (id: string) => {
        setChats(chats.filter(chat => chat.id !== id));
    };

    return (
        // <div className='flex flex-col p-8 h-full'>
        //     <div className='bg-secondary-background border-b h-12'>
        //         {/*<Avatar className='' src={{src: '', width: 1, height: 1, format: 'webp'}}/>*/}
        //     </div>
        //     <div className='p-4 grow bg-background-accent'>
        //         {/*{messages?.data?.map(message => (*/}
        //         {/*    // <Message message={message} />*/}
        //         {/*))}*/}
        //     </div>
        //     <div className='bg-secondary-background border-t flex'>
        //         <Input />
        //         <Button />
        //     </div>
        // </div>
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
                            key={chat.id}
                            id={chat.id}
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