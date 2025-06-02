import React, {type PropsWithChildren} from 'react';
import NavBar from "~/widgets/sideBar/NavBar";
import {Outlet} from "react-router";
import {Input} from "~/shared/ui/Input";
import {Button} from "~/shared/ui/Button";
import Search from "~/features/chat/ui/Search";
import Chat from "~/features/chat/ui/Chat";

const SideBar = () => {
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
                    <h1 className='text-foreground'>
                        Chats
                    </h1>
                    {chats.map((chat: Chat) => (
                        <Chat />
                    ))}
                </section>
            </section>
            <section className='h-full grow'>
                <Outlet />
            </section>
        </div>
    );
};

export default SideBar;