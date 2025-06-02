import React from 'react';
import Avatar from "~/shared/ui/Avatar";
import {useQuery} from "@tanstack/react-query";
import type {MessageI} from "~/features/chat/model/Message";
import {getChatQueryKey} from "~/features/chat/lib/getChatQueryKey";
import {Input} from "~/shared/ui/Input";
import {Button} from "~/shared/ui/Button";
import Message from "~/features/chat/ui/Message";
import {chatApi} from "~/shared/api/chat";
import {useParams} from "react-router";
import SendMessage from "~/features/chat/SendMessage";

const ChatSheet = () => {
    const {chatId: id = ''} = useParams();
    const messages = useQuery<MessageI[]>({
        queryKey: getChatQueryKey(id),
        queryFn: () => chatApi.getMessages(id)
    })
    const {data: chats} = useQuery({
        queryKey: ['chats'],
        queryFn: chatApi.getChats,
    });
    const chatInfo = chats?.find(chat => chat._id === id)
    console.log(chats)
    console.log(chatInfo)
    return (
        <div className='flex flex-col h-full'>
            <div className='bg-secondary-background border-b h-20 flex items-center p-4'>
                {id ? <>
                    <Avatar width={72} height={72}/>
                    <h4>{`${chatInfo?.firstName || ''} ${chatInfo?.lastName || ''}`}</h4>
                </> : null}
            </div>
            <div className='p-4 grow bg-background-accent'>
                {messages?.data?.map(message => (
                    <Message message={message}/>
                ))}
            </div>
            <div className='bg-secondary-background border-t flex'>
                <SendMessage />
            </div>
        </div>
    );
};

export default ChatSheet;