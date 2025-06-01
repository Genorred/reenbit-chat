import React from 'react';
import Button from "~/shared/ui/Button";
import Input from "~/shared/ui/Input";
import Avatar from "~/shared/ui/Avatar";
import {useQuery} from "@tanstack/react-query";
import type {MessageI} from "~/features/chat/model/Message";
import {getChatQueryKey} from "~/features/chat/lib/getChatQueryKey";

const ChatSheet = () => {
    const id = 1
    const messages = useQuery<[MessageI]>({queryKey: getChatQueryKey(id)})
    return (
        <div className='flex flex-col p-8'>
            <div className='bg-secondary-background border-b'>
                <Avatar className='' src={{src: '', width: 1, height: 1, format: 'webp'}}/>
            </div>
            <div className='p-4'>
                {/*{messages?.data?.map(message => (*/}
                {/*    // <Message message={message} />*/}
                {/*))}*/}
            </div>
            <div className='bg-secondary-background border-t flex'>
                <Input />
                <Button />
            </div>
        </div>
    );
};

export default ChatSheet;