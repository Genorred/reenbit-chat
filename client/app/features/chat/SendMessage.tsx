import React, {useRef} from 'react';
import {useSubscribeOnChat} from "~/features/chat/lib/useSubscribeOnChat";
import {useParams} from "react-router";
import {IoIosSearch} from "react-icons/io";
import {IoSendSharp} from "react-icons/io5";

const SendMessage = () => {
    const {chatId: id = ''} = useParams();
    const {sendMessage} = useSubscribeOnChat(id)
    const ref = useRef<HTMLInputElement>(null);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("SendMessage", ref.current?.value);
        if (ref.current) {
            sendMessage(ref.current.value)
        }
    }
    return (
        <form className='relative m-4 w-full' onSubmit={onSubmit}>
            <input ref={ref} placeholder='Type your message' type='text'
                   className='flex gap-2 bg-background items-center rounded-3xl px-10 p-2 border w-full'>
            </input>
            <IoSendSharp className='absolute top-1/2 right-4 -translate-y-1/2'/>
        </form>
    );
};

export default SendMessage;