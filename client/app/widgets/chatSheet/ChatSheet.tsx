import React, {useLayoutEffect, useRef} from 'react';
import Avatar from "~/shared/ui/Avatar";
import {useQuery} from "@tanstack/react-query";
import type {MessageI} from "~/features/message/model/Message";
import {getChatQueryKey} from "~/features/message/lib/getChatQueryKey";
import Message from "~/features/message/ui/Message";
import {chatApi} from "~/shared/api/chat";
import {Link, useParams} from "react-router";
import SendMessage from "~/features/message/ui/SendMessage";
import Toggle from "~/shared/ui/Toggle";
import {IoIosArrowRoundBack} from "react-icons/io";
import AutoMessagingToggle from "~/features/message/ui/AutoMessagingToggle";

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

    const ref = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        if (ref.current)
            ref.current.scrollTop = ref.current.scrollHeight;
    })
    return (
        <div className='flex flex-col h-screen relative'>
            <div className='bg-secondary-background border-b h-20 flex items-center justify-between p-4'>
                {id ?
                    <>
                        <div className='flex items-center gap-4'>
                            <Link className='lg:hidden flex items-center justify-center cursor-pointer' to={{pathname: '/'}}>
                                <IoIosArrowRoundBack className='w-8 h-8'/>
                            </Link>
                            <div className="flex items-center gap-4">
                                <Avatar width={72} height={72}/>
                                <h4>{`${chatInfo?.firstName || ''} ${chatInfo?.lastName || ''}`}</h4>
                            </div>
                        </div>
                        <AutoMessagingToggle />
                    </> : null}
            </div>
            <div className='p-4 grow bg-background-accent overflow-y-auto flex flex-col gap-4' ref={ref}>
                {messages?.data?.map(message => (
                    <Message message={message} key={message._id}/>
                ))}
            </div>
            <div className='bg-secondary-background border-t p-4'>
                <SendMessage/>
            </div>
        </div>
    );
};

export default ChatSheet;